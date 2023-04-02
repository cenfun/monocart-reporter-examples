const name = 'nothing';

export default {
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
