const name = 'parallel';

export default {
    testDir: `../../tests/${name}`,
    outputDir: `../../docs/${name}`,

    retries: 1,

    workers: 6,

    reporter: [
        ['list'],
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
