import path from 'path';
import { test, expect } from '@playwright/test';
import { takeCoverage } from 'monocart-reporter';

test.describe.configure({
    mode: 'serial'
});

let singlePage;

// test v8 and istanbul
const pageUrl = `file://${path.resolve('packages/coverage/public/index.html')}`;

test.beforeAll(async ({ browser }) => {
    console.log('beforeAll new page');
    singlePage = await browser.newPage();
});
test.afterAll(async () => {
    await singlePage.close();
    console.log('afterAll close page');
});

test.describe('take v8 coverage', () => {
    test('first, startJSCoverage and open page', async () => {
        await singlePage.coverage.startJSCoverage();
        await singlePage.goto(pageUrl);
    });

    test('next, run test cases', async () => {
        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
    });

    test('finally, stopJSCoverage and take coverage', async () => {
        // take v8 coverage
        const jsCoverage = await singlePage.coverage.stopJSCoverage();
        // filter file list
        const coverageInput = jsCoverage.filter((item) => {
            // only js file
            if (!item.url.endsWith('.js')) {
            // return false;
            }
            return true;
        });
        expect(coverageInput.length).toBeGreaterThan(0);
        // coverage report
        const report = await takeCoverage(coverageInput, test.info());
        console.log(report.lines);
    });

});

test.describe('take istanbul coverage', () => {
    test('first, open page', async () => {
        await singlePage.goto(pageUrl);
    });

    test('next, run test cases', async () => {
        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
    });

    test('finally, take coverage', async () => {
        // take istanbul coverage
        const coverageInput = await singlePage.evaluate(() => window.__coverage__);
        expect(coverageInput, 'expect found istanbul data: __coverage__').toBeTruthy();
        // coverage report
        const report = await takeCoverage(coverageInput, test.info());
        console.log(report.lines);
    });

});

const list = ['https://github.com/cenfun', 'https://playwright.dev/', 'https://www.youtube.com/'];

// for debug
list.length = 0;

list.forEach((url) => {

    test.describe(`take coverage ${url}`, () => {
        test('first, startJSCoverage and open page', async () => {
            await singlePage.coverage.startJSCoverage();
            await singlePage.goto(url);
        });

        test('next, run test cases', async () => {
            await new Promise((resolve) => {
                setTimeout(resolve, 500);
            });
        });

        test('finally, stopJSCoverage and take coverage', async () => {
        // take v8 coverage
            const jsCoverage = await singlePage.coverage.stopJSCoverage();
            // filter file list
            const coverageInput = jsCoverage.filter((item) => {
            // only js file
                if (!item.url.endsWith('.js')) {
                    // return false;
                }
                return true;
            });
            expect(coverageInput.length).toBeGreaterThan(0);
            // coverage report
            const report = await takeCoverage(coverageInput, test.info());
            console.log(report.lines);
        });

    });

});
