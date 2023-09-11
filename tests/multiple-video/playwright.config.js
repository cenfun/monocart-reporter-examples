import path from 'path';

const name = 'multiple-video';
const outputDir = path.resolve(`./docs/${name}`);

export default {
    testDir: `../../tests/${name}`,
    outputDir: outputDir,

    retries: 1,

    use: {
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'on-first-retry'
    },

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: path.resolve(outputDir, 'index.html')
        }]
    ]
};
