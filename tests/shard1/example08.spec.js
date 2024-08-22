import fs from 'fs';
import path from 'path';
import { test } from './fixtures.js';

import { attachNetworkReport } from 'monocart-reporter';

let context;
test.describe('attach network report', () => {

    const harPath = path.resolve('.temp/network-report.har');
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
        await page.goto('http://localhost:8090/');
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
