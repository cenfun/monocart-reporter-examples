import { devices } from '@playwright/test';
import browserstack from './browserstack.js';

const name = 'browserstack';

export default {
    testDir: './',
    outputDir: `../../.temp/${name}`,

    metadata: {
        env: 'STG',
        type: 'Regression',
        url: 'https://www.npmjs.org/package/monocart-reporter'
    },

    projects: [{
        name: 'chromium',
        use: devices['Desktop Chrome']
    }],

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `.temp/${name}/index.html`,
            onEnd: async (reportData, helper) => {

                await browserstack(reportData, helper);

            }
        }]
    ]
};
