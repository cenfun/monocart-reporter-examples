export default {
    testDir: '../../tests/tags-column',
    outputDir: '../../docs/tags-column',

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name: 'tags-column',
            outputFile: 'docs/tags-column/index.html',
            tags: {
                fast: {
                    background: 'green'
                },

                slow: {
                    background: '#d00'
                },

                Positive: {
                    style: {
                        background: '#0000FF'
                    },
                    description: 'This is Positive Test'
                },

                Negative: {
                    background: '#FFA500'
                }

            },
            columns: (defaultColumns) => {

                // disable title tags
                defaultColumns.find((column) => column.id === 'title').titleTagsDisabled = true;

                // add tags column
                const index = defaultColumns.findIndex((column) => column.id === 'type');
                defaultColumns.splice(index, 0, {
                    id: 'tags',
                    name: 'Tags',
                    width: 150,
                    formatter: 'tags'
                });
            }
        }]
    ]
};
