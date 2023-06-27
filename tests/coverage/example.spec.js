import path from 'path';
import { pathToFileURL } from 'url';
import { test, expect } from '@playwright/test';
import { attachCoverageReport, addCoverageReport } from 'monocart-reporter';

test('take istanbul coverage', async ({ page }) => {
    const pageUrl = pathToFileURL(path.resolve('packages/coverage/public/istanbul.html')).toString();
    await page.goto(pageUrl);

    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });

    // take istanbul coverage
    const coverageInput = await page.evaluate(() => window.__coverage__);
    await page.close();
    expect(coverageInput, 'expect found istanbul data: __coverage__').toBeTruthy();
    // coverage report
    const report = await attachCoverageReport(coverageInput, test.info());
    console.log(report.summary);

});

const list = [
    {
        title: 'take v8 coverage with instrumented dist',
        url: pathToFileURL(path.resolve('packages/coverage/public/istanbul.html')).toString()
    },
    {
        title: 'take v8 coverage',
        url: pathToFileURL(path.resolve('packages/coverage/public/v8.html')).toString()
    },
    {
        title: 'take coverage juejin.cn 1',
        url: 'http://juejin.cn/'
    },
    {
        title: 'take coverage juejin.cn 2',
        url: 'http://juejin.cn/'
    }
];

list.forEach((item, i) => {

    test(item.title, async ({ page }) => {

        await Promise.all([
            page.coverage.startJSCoverage({
                resetOnNavigation: false
            }),
            page.coverage.startCSSCoverage({
                resetOnNavigation: false
            })
        ]);

        await page.goto(item.url);

        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });

        // take v8 coverage
        const [jsCoverage, cssCoverage] = await Promise.all([
            page.coverage.stopJSCoverage(),
            page.coverage.stopCSSCoverage()
        ]);

        // filter file list
        const coverageList = [... jsCoverage, ... cssCoverage];
        expect(coverageList.length).toBeGreaterThan(0);
        // coverage report
        const report = await attachCoverageReport(coverageList, test.info());
        console.log(report.summary);

        await addCoverageReport(coverageList, test.info());

    });


});
