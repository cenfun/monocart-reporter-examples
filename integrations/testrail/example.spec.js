import { test, expect } from '@playwright/test';

/**
 * @testrail 2125
 */
test('passed test', () => {

});

/**
 * @testrail 2126
 */
test('failed test', () => {
    expect(false).toBe(true);
});
