export default {
    testDir: '../../tests/visual',
    outputDir: '../../docs/visual',

    use: {
        screenshot: 'only-on-failure'
    },

    reporter: [
        ['list'],
        // ['html'],
        ['monocart-reporter', {
            name: 'visual',
            outputFile: 'docs/visual/index.html'
        }]
    ]
};
