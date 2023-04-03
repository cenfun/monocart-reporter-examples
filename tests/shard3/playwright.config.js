const name = 'shard3';

import { devices } from '@playwright/test';

export default {
    testDir: '../../tests/parallel',
    outputDir: `../../docs/${name}`,

    retries: 1,

    shard: {
        total: 3, current: 3
    },

    projects: [
        {
            name: 'chromium',
            use: devices['Desktop Chrome']
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
