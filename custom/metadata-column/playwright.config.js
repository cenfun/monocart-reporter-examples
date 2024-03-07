
const name = 'metadata-column';

import { devices } from '@playwright/test';

export default {
    testDir: './',
    outputDir: `../../docs/${name}`,

    projects: [
        {
            name: 'chromium',
            use: devices['Desktop Chrome'],
            metadata: {
                device: 'Desktop Chrome'
            }
        },
        {
            name: 'firefox',
            use: devices['Desktop Firefox'],
            metadata: {
                device: 'Desktop Firefox'
            }
        },
        {
            name: 'Mobile Safari',
            use: devices['iPhone 12'],
            metadata: {
                device: 'iPhone 12'
            }
        }
    ],

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `docs/${name}/index.html`,

            columns: (defaultColumns) => {

                // add `device` column after `duration` column
                const index = defaultColumns.findIndex((column) => column.id === 'duration');
                defaultColumns.splice(index, 0, {
                    id: 'device',
                    name: 'Device',
                    width: 150,
                    formatter: (v, rowItem, columnItem) => {
                        if (v) {
                            return `<b style="color:green">${v}</b>`;
                        }
                        return '';
                    }
                });

            },

            visitor: (data, pwData) => {

                // add `device` for project data
                if (data.type === 'suite' && data.suiteType === 'project') {
                    data.device = data.metadata && data.metadata.device;
                }

            }
        }]
    ]
};
