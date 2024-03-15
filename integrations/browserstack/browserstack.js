import EC from 'eight-colors';
import dotenv from 'dotenv';
import axios from 'axios';

// https://github.com/motdotla/dotenv
dotenv.config();

export default async (reportData, helper) => {

    const akiKey = process.env.BROWSERSTACK_API_KEY;
    const client = createClient(akiKey);

    // api doc
    // https://www.browserstack.com/docs/test-management/api-reference/test-runs

    const project_id = 'PR-2';

    const allCases = helper.filter((item) => item.type === 'case' && item.browserstack);
    // const test_cases = allCases.map((item) => item.browserstack);

    // Get test runs list
    // const runs = await client.get(`/api/v2/projects/${project_id}/test-runs`);
    // console.log(runs);

    // Step 1, Create test run
    // const res = await client.post(`/api/v2/projects/${project_id}/test-runs`, {
    //     test_run: {
    //         name: 'My Test Run',
    //         description: '',
    //         // State of the test run. The valid states are new_run, in_progress, under_review, rejected, done, and closed.
    //         run_state: 'new_run',
    //         include_all: true
    //     }
    // });

    // if (!res || !res.success) {
    //     return;
    // }

    // const testrun = res.testrun;
    // const test_run_id = testrun.identifier;

    const test_run_id = 'TR-16';

    // Step 2: Add test result to test run
    const allRequest = allCases.map((item) => {
        return client.post(`/api/v2/projects/${project_id}/test-runs/${test_run_id}/results`, {
            test_case_id: item.browserstack,
            test_result: {
                // passed, failed
                status: item.caseType
            }
        });
    });

    let err;
    await Promise.all(allRequest).catch((e) => {
        err = e;
    });

    if (err) {
        console.log(err);
        return;
    }

    // Step 3: Close test run

    EC.logGreen('[browserstack] completed');

};

const createClient = function(akiKey) {
    const entrypoint = 'https://test-management.browserstack.com';
    const headers = {
        Authorization: `Basic ${Buffer.from(akiKey).toString('base64')}`
    };
    // console.log(headers);
    const handleError = (err, api) => {
        EC.logRed(EC.red(`ERROR: Catch a error on: ${api}`));
        if (err.response) {
            console.log(err.response.data);
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log(err.message);
        }
    };

    return {
        get: async function(api) {
            let err;
            const res = await axios.get(entrypoint + api, {
                headers
            }).catch(function(e) {
                err = e;
            });
            if (err) {
                handleError(err, api);
                return;
            }
            return res.data;
        },
        post: async function(api, data) {
            // console.log(data);
            let err;
            const res = await axios.post(entrypoint + api, data, {
                headers
            }).catch(function(e) {
                err = e;
            });
            if (err) {
                handleError(err, api);
                return;
            }
            return res.data;
        }
    };
};
