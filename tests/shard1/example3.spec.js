import { test, expect } from './fixtures.js';

test('@passed or @failed or @flaky', () => {
    expect(Math.random()).toBeLessThan(0.5);
});

test('@passed or @flaky', () => {
    expect(test.info().retry).toBe(Math.random() > 0.5 ? 1 : 0);
});

test.describe('describe', () => {

    test('screenshot attachment', async ({ page }, testInfo) => {
        await page.setContent('<h3>Monocart Reporter Screenshot</h3>');
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', {
            body: screenshot,
            contentType: 'image/png'
        });
    });

});
