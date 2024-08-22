const name = 'shard2';

import { devices } from '@playwright/test';

export default {
    testDir: '../../tests/shard1',
    outputDir: `../../docs/${name}`,

    retries: 1,

    shard: {
        total: 3,
        current: 2
    },

    use: {
        // test attachments
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'on-first-retry'
    },

    projects: [
        {
            name: 'chromium',
            use: devices['Desktop Chrome']
        }
    ],

    webServer: {
        command: 'npm run serve',
        url: 'http://localhost:8090/'
    },

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `docs/${name}/index.html`,
            // global coverage
            coverage: {
                reports: [
                    'console-details',
                    'v8',
                    'raw'
                ]
            },
            tags: {
                passed: {
                    background: 'green'
                },
                failed: {
                    background: '#d00'
                },
                flaky: {
                    background: 'orange'
                }
            }
        }]
    ]
};
