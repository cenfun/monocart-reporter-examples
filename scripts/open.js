import fs from 'fs';
import path from 'path';
import open from 'open';

const main = async () => {
    const list = fs.readdirSync(path.resolve('docs'));
    for (const item of list) {
        await open(path.resolve('docs', item, 'index.html'));
    }
};

main();
