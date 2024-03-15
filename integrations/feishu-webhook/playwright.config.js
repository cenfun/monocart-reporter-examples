import feishuWebhook from './feishu-webhook.js';

const name = 'feishu-webhook';

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
            onEnd: async (reportData, helper) => {

                // feishu integration with webhook
                await feishuWebhook(reportData, helper);


            }
        }]
    ]
};
