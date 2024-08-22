import { test } from './fixtures.js';

import { chromium } from '@playwright/test';
import { attachAuditReport } from 'monocart-reporter';
import lighthouse from 'lighthouse';

test('attach lighthouse audit report', async () => {
    const port = 9222;
    const browser = await chromium.launch({
        args: [`--remote-debugging-port=${port}`]
        // headless: false
    });
    // https://github.com/GoogleChrome/lighthouse/tree/main/docs
    const options = {
        // logLevel: 'info',
        // onlyCategories: ['performance', 'best-practices', 'seo'],
        output: 'html',
        port
    };
    const url = 'http://localhost:8090/';
    const runnerResult = await lighthouse(url, options);
    await browser.close();
    await attachAuditReport(runnerResult, test.info());
});
