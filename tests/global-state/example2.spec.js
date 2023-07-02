import { test } from '@playwright/test';
import { useState } from 'monocart-reporter';

test('example test 2', async ({ browserName }) => {

    const state = useState({
        timeout: 10 * 1000
    });

    // lock
    await state.send('lock');

    console.log(`[${browserName}][test 2] get list`);
    const list = await state.get('list');
    console.log(`[${browserName}][test 2] receive list`, list);

    list.push(`${browserName} 2`);

    console.log(`[${browserName}][test 2] set list`, list);
    await state.set('list', list);

    // unlock
    await state.send('unlock');

});

