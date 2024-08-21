import { test, expect } from './fixtures.js';

test('@passed or @failed or @flaky', () => {
    expect(Math.random()).toBeLessThan(0.5);
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

test('@passed or @skipped', () => {
    if (Math.random() > 0.5) {
        test.skip();
    }
});
