export type State = {
    players: Array<PlayerId | undefined>;
    board: Array<PlayerId | undefined>;
    turn: PlayerId;
}

export type PlayerId = 1 | 2;
