import { test, expect } from '@playwright/test';

test('passed test', () => {

});

test('failed test', () => {
    expect(false).toBe(true);
});
