const name = 'global-state';

import { devices } from '@playwright/test';

let locking = false;
const waitingList = [];
const lockHandler = () => {
    if (locking) {
        return new Promise((resolve) => {
            waitingList.push(resolve);
        });
    }
    locking = true;
};
const unlockHandler = () => {
    if (waitingList.length) {
        const next = waitingList.shift();
        next();
        locking = true;
    } else {
        locking = false;
    }
};

export default {
    testDir: `../../tests/${name}`,
    outputDir: `../../docs/${name}`,

    globalTeardown: './global-teardown.js',

    projects: [
        {
            name: 'chromium',
            use: devices['Desktop Chrome']
        },
        {
            name: 'firefox',
            use: devices['Desktop Firefox']
        }
    ],

    logging: 'debug',

    reporter: [
        ['dot'],
        ['monocart-reporter', {
            name,
            outputFile: `docs/${name}/index.html`,

            logging: 'debug',

            state: {

                data: {
                    list: [1, 2, 3]
                },

                onReceive: (action) => {
                    if (action === 'lock') {
                        return lockHandler();
                    }
                    return unlockHandler();
                }

            }
        }]
    ]
};
