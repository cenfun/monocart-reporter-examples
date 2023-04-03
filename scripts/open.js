import fs from 'fs';
import path from 'path';
import open from 'open';

const main = async () => {
    const list = fs.readdirSync(path.resolve('docs'), {
        withFileTypes: true
    });
    for (const item of list) {
        if (item.isDirectory()) {
            await open(path.resolve('docs', item.name, 'index.html'));
        }
    }
};

main();
