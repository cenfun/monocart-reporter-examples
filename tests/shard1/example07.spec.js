import { test, expect } from './fixtures.js';


test('flaky', () => {
    expect(test.info().retry).toBe(1);
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
