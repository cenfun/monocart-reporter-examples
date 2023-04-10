const name = 'typescript';

export default {
    testDir: `../../tests/${name}`,
    outputDir: `../../docs/${name}`,

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `docs/${name}/index.html`,
            visitor: (data, metadata, collect) => {
                // auto collect data from comments
                const parserOptions = {
                    // https://babeljs.io/docs/babel-parser

                    // Indicate the mode the code should be parsed in.
                    // Can be one of "script", "module", or "unambiguous". Defaults to "script".
                    sourceType: 'module',

                    // enable typescript syntax as needed
                    plugins: ['typescript']

                };
                const comments = collect.comments(parserOptions);
                if (comments) {
                    Object.assign(data, comments);
                }
            }
        }]
    ]
};
