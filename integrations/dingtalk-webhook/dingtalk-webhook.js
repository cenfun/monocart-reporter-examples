import axios from 'axios';
import EC from 'eight-colors';
import dotenv from 'dotenv';

// https://github.com/motdotla/dotenv
dotenv.config();

export default async (reportData, helper) => {

    // https://open.dingtalk.com/document/robots/custom-robot-access

    // do not store your webhook url in the source code, but pass your webhook url from environment variables
    const url = process.env.DINGTALK_WEBHOOK;

    const {
        name, dateH, durationH, summary
    } = reportData;

    const lines = [`## ${name}`, `> ${dateH} (${durationH})`];

    ['tests', 'passed', 'flaky', 'skipped', 'failed'].forEach((k) => {
        const item = summary[k];
        const percent = item.percent ? ` (${item.percent})` : '';
        lines.push(`- **${item.name}** ${item.value} ${percent}`);
    });

    lines.push('\n  ');

    if (summary.passed.value === summary.tests.value) {
        lines.push('✔ Congratulations! All tests passed.');
    } else if (summary.failed.value > 0) {
        // @owners of all failed cases
        const owners = [];
        helper.forEach((item) => {
            if (item.type === 'case' && item.caseType === 'failed' && item.owner) {
                owners.push(`@${item.owner}`);
            }
        });
        if (owners.length) {
            lines.push(`Hey ${owners.join(' ')}, please fix the failed cases and run test again.`);
        }
    }

    const data = {
        'msgtype': 'markdown',
        'markdown': {
            'title': 'test report',
            'text': lines.join('\n')
        }
    };

    console.log(data);

    const res = await axios.post(url, data).catch((err) => {
        // console.log(err);
        EC.logRed(err.message);
        EC.logRed('[dingtalk] failed to post message');
    });

    if (res) {
        console.log(res.data);
    }

};
