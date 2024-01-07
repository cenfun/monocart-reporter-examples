import teamsWebhook from './teams-webhook.js';

const name = 'teams-webhook';

export default {
    testDir: './',
    outputDir: `../../.temp/${name}`,

    metadata: {
        env: 'STG',
        type: 'Regression',
        url: 'https://www.npmjs.org/package/monocart-reporter'
    },

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `.temp/${name}/index.html`,
            onEnd: async (reportData, capability) => {

                // teams integration with webhook
                await teamsWebhook(reportData, capability);


            }
        }]
    ]
};
