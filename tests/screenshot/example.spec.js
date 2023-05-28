import { test } from '@playwright/test';

test('my test', async ({ page }, testInfo) => {

    await page.goto('https://playwright.dev/');

    const description = `Description for ${testInfo.title} (${new Date().toLocaleString()})`;

    // before screenshot, draw something in the page
    await page.evaluate(function(msg) {
        const elem = document.createElement('div');
        elem.className = 'screenshot-helper';
        elem.style.cssText = `pointer-events: none;
            position: absolute; z-index: 99999; 
            left: 20px; bottom: 20px; 
            font-size: 20px; font-weight: bold; padding: 5px 20px;
            opacity: 0.68; color: #ff0000; border: 1px solid red;`;
        elem.innerHTML = msg;
        document.body.appendChild(elem);
    }, description);

    // take screenshot
    await page.screenshot({
        path: testInfo.outputPath('my-screenshot.png')
    });

    // after screenshot, remove the helper message
    await page.evaluate(function(msg) {
        const elem = document.querySelector('.screenshot-helper');
        if (elem) {
            elem.remove();
        }
    });

});
