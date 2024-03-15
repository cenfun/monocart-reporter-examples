import { devices } from '@playwright/test';
import testrail from './testrail.js';

const name = 'testrail';

export default {
    testDir: './',
    outputDir: `../../.temp/${name}`,

    metadata: {
        env: 'STG',
        type: 'Regression',
        url: 'https://www.npmjs.org/package/monocart-reporter'
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
            outputFile: `.temp/${name}/index.html`,
            onEnd: async (reportData, helper) => {

                await testrail(reportData, helper);

            }
        }]
    ]
};
