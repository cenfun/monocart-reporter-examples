import EC from 'eight-colors';
import dotenv from 'dotenv';
import { QaseApi } from 'qaseio';

// https://github.com/motdotla/dotenv
dotenv.config();

export default async (reportData, helper) => {

    // please add qase case id with comments
    /**
     * @qase 1
     */
    // test('passed test', () => {});

    const results = helper.filter((item) => item.type === 'case' && item.qase).map((item) => {
        // https://github.com/qase-tms/qase-javascript/blob/main/qaseio/src/generated/model/result-create.ts

        // IN_PROGRESS = 'in_progress',
        // PASSED = 'passed',
        // FAILED = 'failed',
        // BLOCKED = 'blocked',
        // SKIPPED = 'skipped'

        // caseTypes = ['passed', 'flaky', 'skipped', 'failed'];
        const statusMap = {
            passed: 'passed',
            flaky: 'passed',
            skipped: 'skipped',
            failed: 'failed'
        };
        const status = statusMap[item.caseType];

        return {
            status,
            case_id: item.qase,
            comment: item.qase_comment,
            time_ms: item.duration
        };
    });
    // console.log(results);

    // https://github.com/qase-tms/qase-javascript/tree/main/qaseio

    const qase = new QaseApi({
        token: process.env.QASE_TOKEN
    });

    // your project code
    const project = 'DEMO';

    // get project info
    // const resProject = await qase.projects.getProject(project);
    // console.log(resProject.data);

    // step 1, create test rum
    EC.logCyan('[qase] create test run ...');
    // https://github.com/qase-tms/qase-javascript/blob/main/qaseio/src/generated/model/run-create.ts
    const resRun = await qase.runs.createRun(project, {
        title: `My test run - ${new Date().toISOString().slice(0, 10)}`,
        // include cases
        // cases: [1, 2]
        include_all_cases: true
    });
    // console.log('create test run', resRun.data);

    const runId = resRun.data.result.id;

    // step 2, create test run results
    EC.logCyan('[qase] create test results ...');
    for (const result of results) {
        await qase.results.createResult(project, runId, result);
    }

    // step 3, complete test run
    EC.logCyan('[qase] complete test run ...');
    await qase.runs.completeRun(project, runId);

    EC.logGreen('[qase] done');

};
