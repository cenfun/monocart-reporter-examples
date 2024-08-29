import { devices } from '@playwright/test';

export default (current) => {

    return {
        testDir: '../../tests/shard1',
        outputDir: `../../docs/shard${current}`,

        retries: 1,

        shard: {
            total: 3,
            current
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
                name: `Shard ${current} Report`,
                outputFile: `docs/shard${current}/index.html`,
                // global coverage
                coverage: {
                    name: 'My Code Coverage Report',
                    outputDir: `docs/shard${current}/code-coverage`,
                    reports: [
                        'console-details',
                        'v8',
                        'raw'
                    ]
                }
            }]
        ]
    };

};
