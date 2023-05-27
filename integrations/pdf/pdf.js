import path from 'path';
import { chromium } from '@playwright/test';

export default async (reportData) => {

    const { outputDir, htmlPath } = reportData;

    const browser = await chromium.launch({
        // headless: false
    });
    const page = await browser.newPage();

    const url = path.resolve(htmlPath);
    await page.goto(url);
    // change layout for pdf
    await page.evaluate(() => {
        location.hash = 'page=report';
        window.postMessage({
            flyoverWidth: '100%'
        });
    });

    // wait for content display
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });

    await page.pdf({
        path: path.resolve(outputDir, 'report.pdf'),
        width: 850,
        printBackground: true
    });

    // await delay(1000 * 60 * 5);

    await page.close();
    await browser.close();
};
