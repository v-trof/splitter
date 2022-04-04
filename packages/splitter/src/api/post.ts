import { State } from "../model/state";

const post = (url: string, body: object) => fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
}).then(f => f.text());

export const getState = async (id: string): Promise<State> => {
    const result = await post('/api/state/get', { id });
    return JSON.parse(result)
}

export const setState = (id: string, state: State) => post('/api/state/set', { id, state });

export const draw = (state: State) => post('/api/state/draw', { state })