import fs from 'fs';
import path from 'path';
import { test } from './fixtures.js';

test('app coverage', async ({ page }) => {

    const filePath = path.resolve(import.meta.dirname, 'app.js');
    const content = fs.readFileSync(filePath).toString('utf-8');

    await page.addScriptTag({
        content: `${content}\n//# sourceURL=${filePath}`
    });

    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    });

    await page.evaluate(() => {
        window.app();
    });

});
