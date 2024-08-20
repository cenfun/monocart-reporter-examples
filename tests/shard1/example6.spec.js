import { test, expect } from './fixtures.js';

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
