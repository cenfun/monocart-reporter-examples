import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { test } from '@playwright/test';
import { attachNetworkReport } from 'monocart-reporter';
import { PlaywrightHar } from 'playwright-har';


test.describe.configure({
    mode: 'serial'
});

const pageUrl = pathToFileURL(path.resolve('packages/coverage/public/index.html')).toString();

let context;

test.describe('attach network report 1', () => {

    const harPath = path.resolve('.temp/network-report1.har');
    if (fs.existsSync(harPath)) {
        // remove previous
        fs.rmSync(harPath);
    }

    test('first, open page', async ({ browser }) => {
        context = await browser.newContext({
            recordHar: {
                path: harPath
            }
        });
        const page = await context.newPage();
        await page.goto(pageUrl);
    });

    test('next, run test cases', async () => {

    });

    test('finally, attach HAR', async () => {

        // Close context to ensure HAR is saved to disk.
        await context.close();

        await attachNetworkReport(harPath, test.info(), {
            //  inline: true
        });

    });

});


test.describe('attach network report 2', () => {

    const harPath = path.resolve('.temp/network-report2.har');
    if (fs.existsSync(harPath)) {
        // remove previous
        fs.rmSync(harPath);
    }

    let playwrightHar;

    test('first, open page', async ({ browser }) => {
        context = await browser.newContext();
        const page = await context.newPage();
        playwrightHar = new PlaywrightHar(page);
        await playwrightHar.start();
        await page.goto('http://music.163.com/');
    });

    test('next, run test cases', async () => {
        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
    });

    test('finally, attach HAR', async () => {

        await playwrightHar.stop(harPath);

        await attachNetworkReport(harPath, test.info());

    });

});
