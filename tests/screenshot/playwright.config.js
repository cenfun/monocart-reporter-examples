const name = 'screenshot';

export default {
    testDir: `../../tests/${name}`,
    outputDir: `../../docs/${name}`,

    use: {
        screenshot: 'only-on-failure',
        screenshotFixture: async ({ page, testInfo }, use) => {
            // before screenshot
            await page.evaluate();

            // take screenshot
            await use();

            // after screenshot
            await page.evaluate();
        }
    },

    reporter: [
        ['list'],
        ['monocart-reporter', {
            name,
            outputFile: `docs/${name}/index.html`
        }]
    ]
};
