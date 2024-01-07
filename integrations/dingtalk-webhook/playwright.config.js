import dingtalkWebhook from './dingtalk-webhook.js';

const name = 'dingtalk-webhook';

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

                // dingtalk integration with webhook
                await dingtalkWebhook(reportData, capability);


            }
        }]
    ]
};
