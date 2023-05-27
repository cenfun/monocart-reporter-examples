import path from 'path';
import axios from 'axios';
import FormData from 'form-data';
import { chromium } from '@playwright/test';
import EC from 'eight-colors';

export default async (reportData, capability) => {

    // send message to a discord channel which webhook
    // https://discord.com/developers/docs/resources/webhook

    // do not store your webhook url in the source code, but pass your webhook url from environment variables
    const url = process.env.DISCORD_WEBHOOK;

    const {
        name, dateH, durationH, summary, htmlPath
    } = reportData;

    const fields = ['tests', 'passed', 'flaky', 'skipped', 'failed'].map((k) => {
        const item = summary[k];
        const percent = item.percent ? ` (${item.percent})` : '';
        return {
            name: `${item.name}`,
            value: `${item.value} ${percent}`,
            inline: true
        };
    });

    const message = {
        content: `${name} ${dateH} (${durationH})`,
        embeds: [{
            fields
        }]
    };


    // 1. simply post message
    // await axios({
    //     method: 'post',
    //     url,
    //     data: message
    // }).catch((err) => {
    //     // console.log(err);
    //     EC.logRed(err.message);
    //     EC.logRed('[discord] failed to send message to discord channel');
    // });


    // 2. upload html file
    // const form = new FormData();
    // form.append('file', fs.createReadStream(htmlPath), path.basename(htmlPath));
    // await axios.post(url, form).catch((err) => {
    //     // console.log(err);
    //     EC.logRed(err.message);
    //     EC.logRed('[discord] failed to upload file to discord channel');
    // });


    // 3. rich message (screenshot image)
    const browser = await chromium.launch({
        // headless: false
    });
    const page = await browser.newPage();
    await page.setViewportSize({
        width: 860,
        height: 1060
    });
    await page.goto(path.resolve(htmlPath));
    await page.evaluate(() => {
        location.hash = 'page=report';
        window.postMessage({
            flyoverWidth: '100%'
        });
    });

    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });

    const screenshot = await page.screenshot({
        fullPage: true
    });
    await page.close();
    await browser.close();

    const form = new FormData();
    form.append('file', screenshot, {
        filename: 'screenshot.png',
        contentType: 'image/png'
    });
    message.embeds.push({
        image: {
            url: 'attachment://screenshot.png'
        }
    });
    form.append('payload_json', JSON.stringify(message));

    await axios.post(url, form).catch((err) => {
        // console.log(err);
        EC.logRed(err.message);
        EC.logRed('[discord] failed to post rich message to discord channel');
    });


};
