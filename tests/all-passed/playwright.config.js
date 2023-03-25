const name = 'all-passed';

module.exports = {
    testDir: `../../tests/${name}`,
    outputDir: `../../docs/${name}`,
    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `docs/${name}/index.html`
        }]
    ]
};