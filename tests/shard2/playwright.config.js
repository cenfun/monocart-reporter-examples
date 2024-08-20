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
            // global coverage
            coverage: {
                reports: [
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
