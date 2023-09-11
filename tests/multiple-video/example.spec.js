import { test, expect } from '@playwright/test';

test('my video 1', async ({ page }, testInfo) => {

    await page.setContent('<h3>This is mock page 1</h3>');

    await expect(page).toHaveValue('This is mock page 2');
});

test('my video 2', async ({ page }, testInfo) => {

    await page.setContent('<h3>This is mock page 2</h3>');

    await expect(page).toHaveValue('This is mock page 1');


});

