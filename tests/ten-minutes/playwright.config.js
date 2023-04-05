const name = 'ten-minutes';

export default {
    testDir: `../../tests/${name}`,
    outputDir: `../../docs/${name}`,

    retries: 1,

    reporter: [
        ['list'],
        ['html', {
            outputFolder: '../../.temp/html',
            outputFile: 'index.html',
            open: 'never'
        }],
        ['monocart-reporter', {
            name,
            outputFile: `docs/${name}/index.html`,
            trend: `docs/${name}/index.json`,
            tags: {
                passed: {
                    background: 'green'
                },
                failed: {
                    background: '#d00'
                },
                flaky: {
                    background: 'orange'
                }
            }
        }]
    ]
};
