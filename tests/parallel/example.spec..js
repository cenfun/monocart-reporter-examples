import { test } from '@playwright/test';

test.describe("describe", ()=> {

    test('screenshot attachment', async ({ page }, testInfo) => {
        await page.setContent('<h3>Monocart Reporter Screenshot</h3>');
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', {
            body: screenshot,
            contentType: 'image/png'
        });
    });
    
})