import { test, expect } from '@playwright/test';

/**
 * @qase 1
 */
test('passed test', () => {

});

/**
 * @qase 2
 */
test('failed test', () => {
    expect(false).toBe(true);
});
