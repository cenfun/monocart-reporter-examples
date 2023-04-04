import fs from 'fs';
import path from 'path';
import MonocartReporter from 'monocart-reporter';

const main = async () => {


    const reportDataList = [
        // json file path
        'docs/shard1/index.json',
        'docs/shard2/index.json',
        // or JSON data
        JSON.parse(fs.readFileSync(path.resolve('docs/shard3/index.json')))
    ];

    //  console.log(reportDataList);

    await MonocartReporter.merge(reportDataList, {
        name: 'My Merged Report',
        outputFile: 'docs/merged/index.html',
        attachmentPath: (relativePath, outputDir) => {
            console.log(relativePath, outputDir);
            return `https://cenfun.github.io/monocart-reporter/${relativePath}`;
        },
        onEnd: async (reportData, capacity) => {

        }
    });

    // test remove all json file
    // const list = fs.readdirSync(path.resolve('docs'), {
    //     withFileTypes: true
    // });
    // for (const item of list) {
    //     if (item.isDirectory()) {
    //         const jsonPath = path.resolve('docs', item.name, 'index.json');
    //         if (fs.existsSync(jsonPath)) {
    //             console.log(`remove ${jsonPath}`);
    //             fs.rmSync(jsonPath);
    //         }
    //     }
    // }

};

main();
