import { selectFolder, selectModule, unselectFolder, unselectModule } from "../model/actions/select";
import { State } from "../model/state";
import { getTarget } from "./chartLib/getByMouseEvent"

export const onSelect = (event: MouseEvent, state: State): State => {
    const target = getTarget(event);

    if (target.type === 'none') {
        return {
            ...state,
            selection: {}
        }
    }

    if (target.type === 'module' && state.selection[target.path]) {
        return {
            ...state,
            selection: unselectModule(state.selection, target.path)
        }
    }

    if (target.type === 'module' && !state.selection[target.path]) {
        return {
            ...state,
            selection: selectModule(state.selection, target.path)
        }
    }

    if (target.type === 'folder') {
        const clean = unselectFolder(state.selection, target.path)

        if (JSON.stringify(clean) !== JSON.stringify(state.selection)) {
            return {
                ...state,
                selection: clean
            }
        }

        return {
            ...state,
            selection: selectFolder(clean, target.path, state.cruiserResult)
        }
    }

    return state
}