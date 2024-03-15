import { test, expect } from '@playwright/test';

/**
 * @browserstack TC-99
 */
test('passed test', () => {

});

/**
 * @browserstack TC-100
 */
test('failed test', () => {
    expect(false).toBe(true);
});
