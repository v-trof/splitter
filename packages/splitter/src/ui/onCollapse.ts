import { collapse, uncollapse } from "../model/actions/collapse";
import { selectFolder } from "../model/actions/select";
import { State } from "../model/state";
import { getTarget } from "./chartLib/getByMouseEvent"

export const onCollapse = (event: MouseEvent, state: State): State => {
    const target = getTarget(event);

    if (target.type === 'none') {
        return state;
    }

    if (target.type === 'module') {
        const isCollapsedModule = Object.values(state.collapseMap).some(x => x === target.path);

        if (!isCollapsedModule) {
            return state
        }

        return {
            ...state,
            collapseMap: uncollapse(target.path, state.collapseMap)
        }
    }

    const subSelection = selectFolder({}, target.path, state.cruiserResult)

    return {
        ...state,
        collapseMap: collapse(subSelection, state.collapseMap)
    }
}