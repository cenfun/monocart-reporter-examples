import fs from 'fs';
import path from 'path';

const testsPath = path.resolve( 'tests/ten-minutes');

const list = fs.readdirSync(testsPath).filter((it) => it !== 'playwright.config.js');

list.forEach((it) => {
    fs.rmSync(path.resolve(testsPath, it));
});

const template = `
import { test, expect } from '@playwright/test';
const delay = function(ms) {
    return new Promise((resolve) => {
        if (ms) {
            setTimeout(resolve, ms);
        } else {
            setImmediate(resolve);
        }
    });
};
`;

const files = 8;
const testsPerFile = 128;
const delay = 3000;

const getTemplate1 = (id) => {
    return `test('${id} random case @passed or @failed or @flaky', async () => {
    await delay(Math.floor(Math.random() * ${delay}));
    expect(Math.random()).toBeLessThan(0.5);
});`;
};

const getTemplate2 = (id) => {
    return `test('${id} random case @passed or @flaky', async () => {
    await delay(Math.floor(Math.random() * ${delay}));
    expect(test.info().retry).toBe(Math.random() > 0.5 ? 1 : 0);
});`;
};

const getTemplate3 = (id) => {
    return `test('${id} random case @passed or @skipped', async () => {
    await delay(Math.floor(Math.random() * ${delay}));
    if (Math.random() > 0.5) {
        test.skip();
    }
});`;
};

const getTest = (i, j) => {
    const id = `${i + 1}-${j + 1}`;
    const rd = Math.random();
    if (rd < 0.3) {
        return getTemplate2(id);
    }
    if (rd > 0.7) {
        return getTemplate3(id);
    }
    return getTemplate1(id);
};

for (let i = 0; i < files; i++) {
    const filename = `example${i + 1}.spec.js`;

    const ls = [template];

    for (let j = 0; j < testsPerFile; j++) {
        ls.push(getTest(i, j));
    }

    ls.push('');

    const content = ls.join('\n\r');

    fs.writeFileSync(path.resolve(testsPath, filename), content);
}
