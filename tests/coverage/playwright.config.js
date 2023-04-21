const name = 'coverage';

export default {
    testDir: `../../tests/${name}`,
    outputDir: `../../docs/${name}`,

    retries: 1,

    webServer: {
        command: 'npm run serve',
        url: 'http://localhost:8090/',
        reuseExistingServer: true
    },
    use: {
        baseURL: 'http://localhost:8090/'
    },

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `docs/${name}/index.html`
        }]
    ]
};
