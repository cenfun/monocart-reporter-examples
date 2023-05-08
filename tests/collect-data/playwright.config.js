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
                    width: 100,
                    searchable: true,
                    align: 'center',
                    styleMap: 'font-weight:normal;background:#f8f8f8;',
                    formatter: (v, rowItem, columnItem) => {
                        const key = rowItem[columnItem.id];
                        return `<a href="https://your-jira-url/${key}" target="_blank">${v}</a>`;
                    }
                });

            },

            visitor: (data, metadata, collect) => {

                // [MCR-123] collect data from title
                const matchResult = metadata.title.match(/\[(.+)\]/);
                if (matchResult && matchResult[1]) {
                    data.jira = matchResult[1];
                }

                // collect data from annotations
                if (metadata.annotations) {
                    const jiraItem = metadata.annotations.find((item) => item.type === 'jira');
                    if (jiraItem && jiraItem.description) {
                        data.jira = jiraItem.description;
                    }
                }

                // collect data from comments
                const parserOptions = {
                    sourceType: 'module'
                };
                const comments = collect.comments(parserOptions);
                if (comments) {
                    Object.assign(data, comments);
                }
            }
        }]
    ]
};
