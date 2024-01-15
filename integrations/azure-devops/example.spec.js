import { test, expect } from '@playwright/test';

/**
 * @azureId 10
 */
test('passed test 1', () => {

});

/**
 * @azureId 12
 */
test('failed test 1', () => {
    expect(false).toBe(true);
});
