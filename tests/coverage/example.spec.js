import path from 'path';
import { pathToFileURL } from 'url';
import { test, expect } from '@playwright/test';
import { attachCoverageReport, addCoverageReport } from 'monocart-reporter';

test.describe.configure({
    mode: 'serial'
});

let page;

// test v8 and istanbul
const pageUrl = pathToFileURL(path.resolve('packages/coverage/public/index.html')).toString();

test.describe('take istanbul coverage', () => {
    test('first, open page', async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(pageUrl);
    });

    test('next, run test cases', async () => {
        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
    });

    test('finally, take coverage', async () => {
        // take istanbul coverage
        const coverageInput = await page.evaluate(() => window.__coverage__);
        await page.close();
        expect(coverageInput, 'expect found istanbul data: __coverage__').toBeTruthy();
        // coverage report
        const report = await attachCoverageReport(coverageInput, test.info());
        console.log(report.summary);
    });
});

test.describe('take v8 coverage', () => {
    test('first, startJSCoverage and open page', async ({ browser }) => {
        page = await browser.newPage();
        await page.coverage.startJSCoverage();
        await page.goto(pageUrl);
    });

    test('next, run test cases', async () => {
        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
    });

    test('finally, stopJSCoverage and take coverage', async () => {
        // take v8 coverage
        const jsCoverage = await page.coverage.stopJSCoverage();
        await page.close();
        // filter file list
        const coverageInput = jsCoverage.filter((item) => {
            if (!item.url.endsWith('.js')) {
                // return false;
            }
            return true;
        });
        expect(coverageInput.length).toBeGreaterThan(0);
        // coverage report
        const report = await attachCoverageReport(coverageInput, test.info());
        console.log(report.summary);
    });
});

// const list = ['https://github.com/cenfun', 'https://playwright.dev/', 'https://www.youtube.com/'];

const list = ['http://juejin.cn/', 'http://juejin.cn/'];

list.forEach((url, i) => {

    test.describe(`take coverage ${i} ${url}`, () => {
        test('first, startJSCoverage and open page', async ({ browser }) => {
            page = await browser.newPage();
            await Promise.all([
                page.coverage.startJSCoverage(),
                page.coverage.startCSSCoverage()
            ]);
            await page.goto(url);
        });

        test('next, run test cases', async () => {
            await new Promise((resolve) => {
                setTimeout(resolve, 500);
            });
        });

        test('finally, stopJSCoverage and take coverage', async () => {
            // take v8 coverage
            const [jsCoverage, cssCoverage] = await Promise.all([
                page.coverage.stopJSCoverage(),
                page.coverage.stopCSSCoverage()
            ]);

            await page.close();
            // filter file list
            const coverageList = [... jsCoverage, ... cssCoverage];
            expect(coverageList.length).toBeGreaterThan(0);
            // coverage report
            const report = await attachCoverageReport(coverageList, test.info());
            console.log(report.summary);

            await addCoverageReport(coverageList, test.info());
        });

    });

});
