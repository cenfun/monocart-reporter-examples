import { useState } from 'monocart-reporter';

export default async (config) => {
    const state = useState();

    const list = await state.get('list');
    console.log('[teardown] receive list', list);

};
