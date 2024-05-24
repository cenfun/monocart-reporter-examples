import { devices } from '@playwright/test';
import qase from './qase.js';

export default {
    testDir: './',
    outputDir: '../../.temp/qase',

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
            name: 'qase',
            outputFile: '.temp/qase/index.html',
            onEnd: async (reportData, helper) => {

                await qase(reportData, helper);

            }
        }]
    ]
};
