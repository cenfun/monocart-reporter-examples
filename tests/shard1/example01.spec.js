import fs from 'fs';
import path from 'path';
import { test } from './fixtures.js';

test('foo coverage', async ({ page }) => {

    const filePath = path.resolve(import.meta.dirname, 'app.js');
    const content = fs.readFileSync(filePath).toString('utf-8');

    await page.addScriptTag({
        content: `${content}\n//# sourceURL=${filePath}`
    });

    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });

    await page.evaluate(() => {
        window.foo();
    });

});

test('@passed or @skipped', () => {
    if (Math.random() > 0.5) {
        test.skip();
    }
});
