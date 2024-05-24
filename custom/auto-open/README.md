# Auto Open Report

```js
import open from 'open';

export default {
    // ...
    reporter: [
        ['list'],
        ['monocart-reporter', {
            name: 'auto-open',
            outputFile: 'docs/auto-open/index.html',

            onEnd: async (reportData, helper) => {

                // open report if any cases field
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

```