import { move } from "../model/actions/move";
import { State } from "../model/state";
import { getFolderByMouseEvent } from "./chartLib/getByMouseEvent"

export const onMove = (event: MouseEvent, state: State): State => {
    const target = getFolderByMouseEvent(event);

    if (!target) {
        return state;
    }

    const newState = move(state.selection, target, state);

    return newState;
}