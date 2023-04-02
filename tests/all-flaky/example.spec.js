import { test, expect } from '@playwright/test';

test('one', () => {
    expect(test.info().retry).toBe(1);
});
