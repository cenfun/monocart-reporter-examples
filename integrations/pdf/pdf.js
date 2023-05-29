import path from 'path';
import { pathToFileURL } from 'url';
import { chromium } from '@playwright/test';
import EC from 'eight-colors';

export default async (reportData) => {

    const { outputDir, htmlPath } = reportData;

    const browser = await chromium.launch({
        // headless: false
    });
    const page = await browser.newPage();

    const htmlUrl = pathToFileURL(path.resolve(htmlPath)).toString();
    EC.logCyan(`open ${htmlUrl} ...`);
    await page.goto(htmlUrl);

    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });

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

    await page.close();
    await browser.close();
};
