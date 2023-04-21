import { test } from '@playwright/test';
import { takeCoverage } from 'monocart-reporter';

test.describe.configure({
    mode: 'serial'
});

let singlePage;

test.beforeAll(async ({ browser }) => {
    console.log('beforeAll');
    singlePage = await browser.newPage();
    await singlePage.coverage.startJSCoverage();
});

test.afterAll(async () => {

    // take v8 coverage
    const jsCoverage = await singlePage.coverage.stopJSCoverage();
    const coverageInput = jsCoverage.filter((item) => {
        // only js file
        if (!item.url.endsWith('.js')) {
            // return false;
        }
        return true;
    });
    const report = await takeCoverage(coverageInput, test.info());

    // take istanbul coverage
    // const coverageInput = await singlePage.evaluate(() => window.__coverage__);
    // const report = await takeCoverage(coverageInput, test.info());

    // coverage report
    console.log(report.total);

    await singlePage.close();

    console.log('afterAll');
});

test('runs first', async () => {
    //  await singlePage.goto('./');
    // await singlePage.goto('http://localhost:10353/');

    // await singlePage.goto('https://playwright.dev/');
    await singlePage.goto('https://www.ruanyifeng.com/blog/');
});

test('runs second', async () => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    // await singlePage.getByText('Get Started').click();
});
