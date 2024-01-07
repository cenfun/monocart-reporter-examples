import slackWebApi from './slack-web-api.js';

const name = 'slack-web-api';

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

                // slack integration with web api
                await slackWebApi(reportData, capability);


            }
        }]
    ]
};
