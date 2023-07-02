import { test } from '@playwright/test';
import { useState } from 'monocart-reporter';

test('example test 1', async ({ browserName }) => {

    const state = useState({
        timeout: 10 * 1000
    });

    // lock
    await state.send('lock');

    console.log(`[${browserName}][test 1] get list`);
    const list = await state.get('list');
    console.log(`[${browserName}][test 1] receive list`, list);

    list.push(`${browserName} 1`);

    console.log(`[${browserName}][test 1] set list`, list);
    await state.set('list', list);

    // unlock
    await state.send('unlock');
});
