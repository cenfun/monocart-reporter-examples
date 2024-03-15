import * as azdev from 'azure-devops-node-api';
import dotenv from 'dotenv';

// https://github.com/motdotla/dotenv
dotenv.config();

export default async (reportData, helper) => {

    // https://github.com/microsoft/azure-devops-node-api

    // your collection url
    const orgUrl = 'https://dev.azure.com/cenfun-azure/ ';
    const project = 'monocart-reporter';

    // do not store your token in the source code, but pass your token from environment variables
    const token = process.env.AZURE_PERSONAL_ACCESS_TOKEN;

    const authHandler = azdev.getPersonalAccessTokenHandler(token);
    const connection = new azdev.WebApi(orgUrl, authHandler);

    // const planId = 11;

    const testApi = await connection.getTestApi();

    // const testRun = await testApi.createTestRun({
    //     name: 'My test run',
    //     automated: true,
    //     plan: {
    //         id: planId
    //     }
    // }, project);

    // const runId = testRun.id;

    const runId = 10;

    const results = [];

    helper.forEach((item) => {
        if (item.type === 'case' && item.azureId) {
            // https://learn.microsoft.com/en-us/azure/devops/report/analytics/entity-reference-test-plans?view=azure-devops#testoutcome-enumerated-type-members
            // Passed 2 Passed Test executed successfully.
            // Failed 3 Failed Test not meeting the desired outcome.
            // Inconclusive 4 Inconclusive Test without a definitive outcome.
            // NotExecuted 8 Not Executed Test marked as skipped for execution.

            const statusMap = {
                passed: 2,
                flaky: 4,
                skipped: 8,
                failed: 3
            };

            const outcome = statusMap[item.caseType];

            results.push({
                testPointId: item.azureId,
                testCaseTitle: item.title,

                durationInMs: item.duration,
                priority: 1,
                outcome
            });
        }
    });

    // console.log(results);

    const res = await testApi.addTestResultsToTestRun(results, project, runId);

    console.log(res.length);

};
