import { ICruiseResult } from "dependency-cruiser"

export type CollapseMap = {
    [module: string]: string; // modulePath: collapsedAsPath
}

export type InitialPathMap = {
    [module: string]: string; // modulePath: initialPath
}

export type Selection = {
    [module: string]: string; // modulePath: selectedAs
}

export type State = {
    cruiserResult: ICruiseResult;
    collapseMap: CollapseMap;
    intialPathMap: InitialPathMap;
    selection: Selection;
}