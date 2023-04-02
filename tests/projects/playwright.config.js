const name = 'projects';

import { devices }from '@playwright/test';

export default {
    testDir: `../../tests/${name}`,
    outputDir: `../../docs/${name}`,

    retries: 1,

    workers: 6,

    projects: [
        {
            name: 'chromium',
            use: devices['Desktop Chrome']
        },
        {
            name: 'firefox',
            use: devices['Desktop Firefox']
        },
        {
            name: 'webkit',
            use: devices['Desktop Safari']
        },
        {
            name: 'Mobile Chrome',
            use: devices['Pixel 5']
        },
        {
            name: 'Mobile Safari',
            use: devices['iPhone 12']
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
