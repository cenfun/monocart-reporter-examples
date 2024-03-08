import open from 'open';

// import { execSync } from 'child_process';

export default {
    testDir: './',
    outputDir: '../../docs/auto-open',

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name: 'auto-open',
            outputFile: 'docs/auto-open/index.html',

            onEnd: async (reportData, helper) => {

                const hasFailed = helper.find((item) => item.type === 'case' && item.caseType === 'failed');
                if (hasFailed) {

                    console.log('There are some of the tests failed, open report ...');
                    // open file directly
                    await open(reportData.htmlPath, {
                        wait: true
                    });

                    // or open url
                    // execSync(`npx monocart show-report ${reportData.htmlPath}`);

                }

            }
        }]
    ]
};
