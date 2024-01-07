const name = 'collect-data';

export default {
    testDir: `../../tests/${name}`,
    outputDir: `../../docs/${name}`,

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `docs/${name}/index.html`,

            columns: (defaultColumns) => {

                defaultColumns.splice(3, 0, {
                    id: 'jira',
                    name: 'JIRA Key',
                    width: 150,
                    searchable: true,
                    styleMap: 'font-weight:normal;background:#f8f8f8;',
                    formatter: (v, rowItem, columnItem) => {
                        if (v) {
                            return v.split(',').map((key) => `<a href="https://your-jira-url/${key}" target="_blank">${key}</a>`).join(' ');
                        }
                    }
                });

            },

            visitor: (data, metadata) => {

                // [MCR-123] collect data from title
                const matches = Array.from(metadata.title.matchAll(/\[([^\]]+)\]/g)).map((arr) => arr[1]);
                if (matches.length) {
                    data.jira = matches.join(',');
                }

                // collect data from annotations
                if (metadata.annotations) {
                    const jiraItem = metadata.annotations.find((item) => item.type === 'jira');
                    if (jiraItem && jiraItem.description) {
                        data.jira = jiraItem.description;
                    }
                }
            }
        }]
    ]
};
