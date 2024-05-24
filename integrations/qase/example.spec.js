import { test, expect } from '@playwright/test';

/**
 * @qase 1
 * @qase_comment Test case comment here
 */
test('passed test', () => {

});

/**
 * @qase 2
 */
test('failed test', () => {
    expect(false).toBe(true);
});
