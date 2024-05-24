import { test, expect } from '@playwright/test';

/**
 * @owner Mark
 */
test('passed test', () => {

});

/**
 * @owner Mark
 */
test('failed test', () => {
    expect(false).toBe(true);
});
