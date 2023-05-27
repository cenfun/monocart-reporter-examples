import { test, expect } from '@playwright/test';

/**
 * @xray MON-2
 */
test('passed test', () => {

});

/**
 * @xray MON-3
 */
test('failed test', () => {
    expect(false).toBe(true);
});
