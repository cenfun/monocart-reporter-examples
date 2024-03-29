import zephyrScale from './zephyr-scale.js';

const name = 'zephyr-scale';

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

                // jira + zephyr scale integration
                await zephyrScale(reportData, helper);

            }
        }]
    ]
};
