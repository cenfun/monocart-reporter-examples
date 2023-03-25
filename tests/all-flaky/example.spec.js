const { test, expect } = require('@playwright/test');

test('one', () => {
    expect(test.info().retry).toBe(1);
});
