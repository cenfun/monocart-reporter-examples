import sendEmail from './send-email.js';

export default {
    testDir: './',
    outputDir: '../../.temp/send-email',

    metadata: {
        env: 'STG',
        type: 'Regression',
        url: 'https://www.npmjs.org/package/monocart-reporter'
    },

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name: 'send-email',
            outputFile: '.temp/send-email/index.html',
            onEnd: async (reportData, helper) => {

                await sendEmail(reportData, helper);

            }
        }]
    ]
};
