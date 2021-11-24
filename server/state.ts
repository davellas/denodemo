export type State = {
    board: Array<PlayerId | undefined>;
    turn: PlayerId;
}

export type PlayerId = 1 | 2;

export const INITIAL_STATE: State = {
    board: [],
    turn: 1
}