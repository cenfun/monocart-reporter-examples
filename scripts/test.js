import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import EC from 'eight-colors';

const run = (dirname) => {

    const command = `npx playwright test -c tests/${dirname}`;

    EC.logMagenta(command);

    return new Promise((resolve) => {
        const worker = child_process.exec(command, {
            // 10M
            maxBuffer: 10 * 1024 * 1024
        });

        worker.stdout.on('data', function(data) {
            console.log(data);
        });

        worker.stderr.on('data', function(data) {
            console.error(data);
        });

        worker.on('close', function(code) {
            resolve();
        });
    });
};

const test = () => {
    const dir = path.resolve('tests');
    const list = fs.readdirSync(dir);
    for (const dirname of list) {
        if (dirname === 'ten-minutes') {
            continue;
        }
        setImmediate(() => {
            run(dirname);
        });
    }
};

test();
