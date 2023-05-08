import { test } from '@playwright/test';

// mock secrets
process.env.PASSWORD = 'my-password';
process.env.TOKEN = 'my-token';


test('mock secrets test', async ({ page }, testInfo) => {

    // mock password in logs
    console.log('secrets in logs', process.env.PASSWORD);

    // mock a password input
    await page.setContent('<input type="password"></input>');

    // type password
    const $password = page.locator('[type="password"]');
    await $password.type(process.env.PASSWORD);
    // step title will be
    // locator.type([type="password"], my-password)

    // mock request with token
    const res = await page.request.fetch(`https://localhost:8080/api?token=${process.env.TOKEN}`);
    // step title will be
    // apiRequestContext.fetch(https://example.com/api?token=my-token)
    // and error logs too

    console.log(res);

});

