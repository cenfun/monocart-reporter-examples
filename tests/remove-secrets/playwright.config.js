const name = 'remove-secrets';

// mock secrets
process.env.PASSWORD = 'my-password';
process.env.TOKEN = 'my-token';

export default {
    testDir: `../../tests/${name}`,
    outputDir: `../../docs/${name}`,

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `docs/${name}/index.html`,
            visitor: (data, metadata) => {
                const mySecrets = [process.env.PASSWORD, process.env.TOKEN];
                mySecrets.forEach((secret) => {
                    // remove from title
                    data.title = data.title.replace(secret, '***');
                    // remove from logs
                    if (data.logs) {
                        data.logs = data.logs.map((item) => item.replace(secret, '***'));
                    }
                    // remove from errors
                    if (data.errors) {
                        data.errors = data.errors.map((item) => item.replace(secret, '***'));
                    }
                });
            }
        }]
    ]
};
