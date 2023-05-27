import { test, expect } from '@playwright/test';

/**
 * @zephyr MON-T1
 */
test('passed test', () => {

});

/**
 * @zephyr MON-T2
 */
test('failed test', () => {
    expect(false).toBe(true);
});
