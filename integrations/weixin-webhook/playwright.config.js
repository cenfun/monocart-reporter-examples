import weixinWebhook from './weixin-webhook.js';

const name = 'weixin-webhook';

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

                // weixin integration with webhook
                await weixinWebhook(reportData, helper);


            }
        }]
    ]
};
