// import fs from 'fs';
// import path from 'path';
import MonocartReporter from 'monocart-reporter';

const main = async () => {

    const reportDataList = [
        // json file path
        'docs/shard1/index.zip',
        'docs/shard2/index.zip',
        'docs/shard3/index.zip'
        // or JSON data
        // JSON.parse(fs.readFileSync(path.resolve('docs/shard3/index.json')))
    ];

    //  console.log(reportDataList);

    await MonocartReporter.merge(reportDataList, {
        name: 'My Merged Report',
        outputFile: 'docs/merged/index.html',

        durationStrategy: 'exclude-idle',
        // attachmentPath: (currentPath, extras) => {
        //     const prevPath = path.resolve(extras.cwd, extras.outputDir, currentPath);
        //     const newDir = path.resolve('docs/merged');
        //     // console.log(prevPath, newDir);
        //     const newPath = path.relative(newDir, prevPath);
        //     // console.log(newPath);
        //     return newPath;
        // },

        onData: (reportData, dataList) => {
            dataList.forEach((data) => {
                console.log('data item name =========== ', data.name);
            });
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
