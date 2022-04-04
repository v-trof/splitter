import { Selection, CollapseMap } from "../state"

export const collapse = (selection: Selection, collapseMap: CollapseMap): CollapseMap => {
    const collapsePatch: CollapseMap = {}

    for (const module in selection) {
        const selectedAs = selection[module];
        const wasSelectedInFolder = selectedAs.includes('/');
        const folderName = selectedAs.split('/')[0]

        if (wasSelectedInFolder) {
            collapsePatch[module] = module.replace(selectedAs, '') + folderName
        }
    }

    console.log({ selection, collapsePatch })

    return {
        ...collapseMap,
        ...collapsePatch
    }
}

export const uncollapse = (targetPath: string, collapseMap: CollapseMap): CollapseMap => {
    const newCollapseMap: CollapseMap = { ...collapseMap }

    for (const item in newCollapseMap) {
        if (newCollapseMap[item] === targetPath) {
            delete newCollapseMap[item]
        }
    }

    return newCollapseMap
}