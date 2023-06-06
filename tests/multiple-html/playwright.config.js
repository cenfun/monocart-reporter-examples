import path from 'path';

const name = 'multiple-html';
const outputDir = path.resolve(`./docs/${name}`);

export default {
    testDir: `../../tests/${name}`,
    outputDir: outputDir,

    reporter: [
        ['list'],
        ['html', {
            open: 'never',
            outputFolder: path.resolve(outputDir, 'html'),
            outputFile: 'index.html'
        }],
        ['monocart-reporter', {
            name,
            outputFile: path.resolve(outputDir, 'index.html')
        }]
    ]
};
