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

test('@passed or @failed or @flaky', () => {
    expect(Math.random()).toBeLessThan(0.5);
});

test('@passed or @flaky', () => {
    expect(test.info().retry).toBe(Math.random() > 0.5 ? 1 : 0);
});

test('@passed or @skipped', () => {
    if (Math.random() > 0.5) {
        test.skip();
    }
});

test.describe('describe', () => {
    for (let i = 0; i < 10; i++) {
        const rd = Math.random();
        if (rd < 0.3) {

            test(`random case ${i} @passed or @flaky`, async () => {
                await delay(Math.floor(Math.random() * 100));
                expect(test.info().retry).toBe(Math.random() > 0.5 ? 1 : 0);
            });

            continue;
        }

        if (rd > 0.7) {

            test(`random case ${i} @passed or @skipped`, async () => {
                await delay(Math.floor(Math.random() * 100));
                if (Math.random() > 0.5) {
                    test.skip();
                }
            });

            continue;
        }

        test(`random case ${i} @passed or @failed or @flaky`, async () => {
            await delay(Math.floor(Math.random() * 100));
            expect(Math.random()).toBeLessThan(0.5);
        });
    }
});
