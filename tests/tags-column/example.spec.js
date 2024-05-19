import { test } from '@playwright/test';

test.describe('describe', {
    tag: ['@fast']
}, () => {

    test('test @Positive', async () => {

    });

    test('@Negative test', async () => {

    });

    test('test', {
        tag: ['@Negative']
    }, async () => {

    });

});
