const name = 'shard1';

import { devices } from '@playwright/test';

export default {
    testDir: '../../tests/parallel',
    outputDir: `../../docs/${name}`,

    retries: 1,

    shard: {
        total: 3,
        current: 1
    },

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

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `docs/${name}/index.html`,
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
