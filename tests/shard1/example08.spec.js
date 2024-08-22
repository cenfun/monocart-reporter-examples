import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';

import { attachNetworkReport, attachCoverageReport } from 'monocart-reporter';

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

test('attach coverage report', async ({ page }) => {
    // coverage API is chromium only
    await Promise.all([
        page.coverage.startJSCoverage({
            resetOnNavigation: false
        }),
        page.coverage.startCSSCoverage({
            resetOnNavigation: false
        })
    ]);

    await page.goto('http://localhost:8090/');

    const [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage()
    ]);
    const coverageList = [... jsCoverage, ... cssCoverage];
    // console.log(coverageList.map((item) => item.url));
    await attachCoverageReport(coverageList, test.info());

});
