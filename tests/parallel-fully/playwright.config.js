const name = 'parallel-fully';

export default {
    testDir: '../../tests/parallel',
    outputDir: `../../docs/${name}`,

    fullyParallel: true,

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
