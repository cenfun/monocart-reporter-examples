const name = 'audit';

export default {
    testDir: `../../tests/${name}`,
    outputDir: `../../docs/${name}`,

    webServer: {
        command: 'npm run serve',
        url: 'http://localhost:8090/'
    },

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `docs/${name}/index.html`
        }]
    ]
};
