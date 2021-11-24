export type State = {
    players: Array<PlayerId | undefined>;
    board: Array<PlayerId | undefined>;
    turn: PlayerId;
}

export type PlayerId = 1 | 2;

export const INITIAL_STATE: State = {
    players: [],
    board: [],
    turn: 1
}