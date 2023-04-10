import { test } from '@playwright/test';
import { updateInternalArchive } from "./util.js"

let str: String;

test.describe('describe @typescript', () => {

    /**
     * @title this is comment title
     */
    test('case title', async () => {
        str = await updateInternalArchive(1, "something");
        console.log(str);
    });

});
