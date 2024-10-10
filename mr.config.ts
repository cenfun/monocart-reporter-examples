import type { MonocartReporterOptions } from "monocart-reporter"

const options: MonocartReporterOptions = {
    // logging: "debug",
    name: 'My Merged Report',
    outputFile: 'docs/merged-ts/index.html',

    onData: async (reportData, dataList) => {
        dataList.forEach((data: any) => {
            console.log(data.name);
        });
    },

    onEnd: async (reportData, capacity) => {
        console.log("ts onEnd")
    }
}

export default options;