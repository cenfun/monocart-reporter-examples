import { test } from '@playwright/test';

test('my test', async ({ page }, testInfo) => {

    await page.setContent('<h3>This is mock page</h3>');

    // take screenshot
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', {
        body: screenshot,
        contentType: 'image/png'
    });

});
