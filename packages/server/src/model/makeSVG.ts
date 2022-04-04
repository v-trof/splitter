import { execSync } from 'child_process';
import { format, ICruiseResult } from 'dependency-cruiser';
import fs from 'fs';
import { resolve } from 'path';

import { prepareFilePath } from './save';

export const saveDot = (depsJson: ICruiseResult, name: string) => {
    const dot = format(depsJson, { outputType: 'dot' }).output;

    if (typeof dot !== 'string') {
        console.error('Werid format output');
        process.exit(1);
    }

    const filePath = prepareFilePath(`dg-${name}.html`);

    console.log(filePath);

    const wrapStreamPath = resolve(__dirname, '../../node_modules/dependency-cruiser/bin/wrap-stream-in-html.js');

    execSync(`dot -T svg > ${filePath}`, {
        input: dot,
        maxBuffer: 2000 * 1024
    });

    const file = fs.readFileSync(filePath, 'utf-8').toString();

    const fixedSize = file.replace(/<svg width="[^"]+" height="[^"]+"/, '<svg width="100%" height="100%"');

    fs.writeFileSync(filePath, fixedSize);

    return filePath;
};
