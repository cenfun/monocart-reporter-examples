import { test } from '@playwright/test';

test('[MCR-123] collect data from title', () => {

});

test('collect data from annotations', () => {
    test.info().annotations.push({
        type: "jira",
        description: "MCR-123"
    })
});

/**
 * @jira MCR-123
 */
test('collect data from comments', () => {

});

