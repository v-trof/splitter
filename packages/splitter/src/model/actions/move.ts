import { renameUsingMap } from "../resultLib/renameUsingMap";
import { CollapseMap, Selection, State } from "../state";

export const move = (selection: Selection, destination: string, state: State): State => {
    const renameMap: CollapseMap = {};

    for (const module in selection) {
        renameMap[module] = `${destination}/${selection[module]}`
    }

    console.log({ renameMap, selection })

    const cruiserResult = renameUsingMap(renameMap, state.cruiserResult);

    return {
        ...state,
        cruiserResult
    };
}