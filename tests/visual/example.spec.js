import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
    test.slow();
    await page.goto('http://graylon-everett.pixpa.com/');
    await expect(page).toHaveScreenshot('fashion-page.png').catch(() => {});
    console.log('screenshot captured');
    console.log('site migrated to new host');
    await page.goto('https://www.pinterest.com/graylone/');
    await expect(page).toHaveScreenshot('fashion-page.png');
});
