import pdf from './pdf.js';

export default {
    testDir: './',
    outputDir: '../../.temp/pdf',

    metadata: {
        env: 'STG',
        type: 'Regression',
        url: 'https://www.npmjs.org/package/monocart-reporter'
    },

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name: 'pdf',
            outputFile: '.temp/pdf/index.html',
            onEnd: async (reportData, helper) => {

                await pdf(reportData, helper);

            }
        }]
    ]
};
