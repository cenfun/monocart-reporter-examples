import sendEmail from './send-email.js';

const name = 'send-email';

export default {
    testDir: `../../integrations/${name}`,
    outputDir: `../../docs/${name}`,

    metadata: {
        env: 'STG',
        type: 'Regression',
        url: 'https://www.npmjs.org/package/monocart-reporter'
    },

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `docs/${name}/index.html`,
            onEnd: async (reportData, capability) => {

                await sendEmail(reportData, capability);

            }
        }]
    ]
};
