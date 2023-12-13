import EC from 'eight-colors';

let coverageResults;

export default {
    testDir: '../../tests/coverage',
    outputDir: '../../docs/coverage',

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name: 'My Test Report with Coverage',
            outputFile: 'docs/coverage/index.html',

            // turn off info logs
            // logging: 'error',

            coverage: {
                onEnd: (_coverageResults) => {
                    coverageResults = _coverageResults;
                }
            },

            onEnd: (reportData) => {
                if (coverageResults) {
                    const { pct, status } = coverageResults.summary;
                    let value = `${status} (${pct}%)`;
                    if (status === 'low') {
                        value = EC.red(value);
                    } else if (status === 'medium') {
                        value = EC.yellow(value);
                    }
                    reportData.summary.coverage = {
                        name: 'Coverage',
                        value
                    };
                }

            }
        }]
    ]
};
