import discordWebhook from './discord-webhook.js';

const name = 'discord-webhook';

export default {
    testDir: './',
    outputDir: `../../.temp/${name}`,

    metadata: {
        env: 'STG',
        type: 'Regression',
        url: 'https://www.npmjs.org/package/monocart-reporter'
    },

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `.temp/${name}/index.html`,
            visitor: (data, metadata, collect) => {
                // auto collect data from the comments
                const parserOptions = {
                    // Indicate the mode the code should be parsed in.
                    // Can be one of "script", "module", or "unambiguous". Defaults to "script".
                    sourceType: 'module'

                    // enable typescript syntax.
                    // plugins: ['typescript']

                    // more https://babeljs.io/docs/babel-parser
                };
                const comments = collect.comments(parserOptions);
                if (comments) {
                    // Append all collected comments data to report data
                    Object.assign(data, comments);
                }
            },
            onEnd: async (reportData, capability) => {

                // discord integration with webhook
                await discordWebhook(reportData, capability);


            }
        }]
    ]
};
