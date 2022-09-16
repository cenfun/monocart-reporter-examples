const path = require('path');

const config = {
    reporter: [
        ['list'],
        ['json', {
            outputFile: path.resolve(__dirname, '../reports/json/results.json')
        }],
        ['html', {
            outputFolder: path.resolve(__dirname, '../reports/html'),
            outputFile: 'results.html',
            open: 'never'
        }],
        ['junit', {
            outputFile: path.resolve(__dirname, '../reports/junit/results.xml')
        }],
        ['monocart-reporter', {
            outputFile: path.resolve(__dirname, '../reports/monocart/index.html')
        }]
    ]
};

module.exports = config;
