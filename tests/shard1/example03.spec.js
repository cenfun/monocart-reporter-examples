import { test, expect } from './fixtures.js';

test('screenshot attachment', async ({ page }, testInfo) => {
    await page.setContent('<h3>Monocart Reporter Screenshot</h3>');
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', {
        body: screenshot,
        contentType: 'image/png'
    });
});

test('screenshot comparison', async ({ page }) => {
    await page.setContent('<h3>Monocart Screenshot</h3>');
    await expect(page).toHaveScreenshot();
});

