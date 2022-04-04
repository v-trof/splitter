import { writeFileSync, rmSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export const prepareFilePath = (fileName: string) => {
    const resultFolder = resolve(__dirname, `../../static`);

    try {
        mkdirSync(resultFolder);
    } catch (e) {
        /* it's ok */
    }
    const resultPath = `${resultFolder}/${fileName}`;

    try {
        rmSync(resultPath);
    } catch (e) {
        /* it's ok */
    }

    return resultPath;
};

export const save = (fileName: string, content: string) => {
    const resultPath = prepareFilePath(fileName);

    writeFileSync(resultPath, content);

    console.log(`Saved result to file ${resultPath}`);
};
