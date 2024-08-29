import child_process from 'child_process';
import EC from 'eight-colors';

// process.env.NODE_OPTIONS = '--trace-warnings';
process.env.NODE_OPTIONS = '--no-warnings';

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
            resolve(code);
        });
    });
};

const test = async () => {

    await run('shard1');
    await run('shard2');
    await run('shard3');

};

test();
