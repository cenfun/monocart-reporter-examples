import { test, expect } from '@playwright/test';

test('one', () => {
    expect(test.info().retry).toBe(1);
});

test('two', () => {
    expect(test.info().retry).toBe(1);
});

test('three', () => {
    expect(test.info().retry).toBe(1);
});
