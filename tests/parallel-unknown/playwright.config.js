const name = 'parallel-unknown';

module.exports = {
    testDir: `../../tests/${name}`,
    outputDir: `../../docs/${name}`,

    retries: 1,

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `docs/${name}/index.html`,
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
