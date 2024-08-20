import { test as testBase, expect } from '@playwright/test';
import { addCoverageReport } from 'monocart-reporter';

// fixtures
const test = testBase.extend({
    autoTestFixture: [async ({ page }, use) => {

        const isChromium = test.info().project.name === 'chromium';

        // console.log('autoTestFixture setup...');
        // coverage API is chromium only
        if (isChromium) {
            await Promise.all([
                page.coverage.startJSCoverage({
                    resetOnNavigation: false
                }),
                page.coverage.startCSSCoverage({
                    resetOnNavigation: false
                })
            ]);
        }

        await use('autoTestFixture');

        // console.log('autoTestFixture teardown...');
        if (isChromium) {
            const [jsCoverage, cssCoverage] = await Promise.all([
                page.coverage.stopJSCoverage(),
                page.coverage.stopCSSCoverage()
            ]);
            const coverageList = [... jsCoverage, ... cssCoverage];
            // console.log(coverageList.map((item) => item.url));
            if (coverageList.length) {
                await addCoverageReport(coverageList, test.info());
            }
        }

    }, {
        scope: 'test',
        auto: true
    }]
});

export { test, expect };
