import { ICruiseResult } from "dependency-cruiser";
import { Selection } from "../state";

const getName = (path: string) => {
    const split = path.split('/')
    const name = split[split.length - 1];
    return name
}

export const selectModule = (selection: Selection, module: string): Selection => {


    return { ...selection, [module]: getName(module) }
}

export const unselectModule = (selection: Selection, module: string): Selection => {
    const newSelection = { ...selection };

    delete newSelection[module];

    return newSelection;
}

export const selectFolder = (selection: Selection, folder: string, result: ICruiseResult): Selection => {
    const folderName = getName(folder)

    const affectedModules = result.modules.filter(module => module.source.includes(folder));
    const selectionPatch: Selection = {}

    for (const module of affectedModules) {
        selectionPatch[module.source] = module.source.replace(folder, folderName)
    }

    return { ...selection, ...selectionPatch }
}

export const unselectFolder = (selection: Selection, folder: string): Selection => {
    const newSelection = { ...selection };

    for (const module in newSelection) {
        if (module.includes(folder)) {
            delete newSelection[module];
        }
    }

    return newSelection;
}