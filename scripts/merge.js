import fs from 'fs';
import path from 'path';
import MonocartReporter from 'monocart-reporter';

const main = async () => {

    // json file path or JSON Object
    const reportDataList = [
        'docs/shard1/index.json',
        'docs/shard2/index.json',
        JSON.parse(fs.readFileSync(path.resolve('docs/shard3/index.json')))
    ];

    //  console.log(reportDataList);

    const code = await MonocartReporter.merge(reportDataList, {
        name: 'My Merged Report',
        outputFile: 'docs/merged/index.html'
    });

    if (code !== 0) {
        process.exit(code);
    }

};

main();
