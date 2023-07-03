import { devices } from '@playwright/test';

// lock/unlock state
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
    testDir: '../../tests/global-state',
    outputDir: '../../docs/global-state',
    globalTeardown: './global-teardown.js',

    projects: [{
        name: 'chromium',
        use: devices['Desktop Chrome']
    }, {
        name: 'firefox',
        use: devices['Desktop Firefox']
    }],

    reporter: [
        ['dot'],
        ['monocart-reporter', {
            name: 'My Global State Report',
            outputFile: 'docs/global-state/index.html',
            // logging: 'debug',
            state: {
                data: {
                    list: [1, 2, 3]
                },
                server: {
                    // host: 'localhost',
                    // port: 8130
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
