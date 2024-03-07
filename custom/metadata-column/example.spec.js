/**
 *@device File
 */

import { test, expect } from '@playwright/test';

/**
 * @device Case
 */
test('passed test', () => {

});

/**
 * @device Suite
 */
test.describe('suite title', () => {

    test('failed test', () => {
        expect(1).toBe(1);
    });

});
