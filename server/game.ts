import { INITIAL_STATE, PlayerId, State } from "./state.ts";

export class Game {
    private state: State = {...INITIAL_STATE};

    public resetGame(): State {
        this.state = {...INITIAL_STATE};
        return this.state;
    }

    public join() {
        if (this.state.players.length >= 2) {
            // already 2 players, let's just return 2;
            return 2;
        }
        if (this.state.players.find(el => el === 1)) {
            this.state.players.push(2);
            return 2;
        }
        this.state.players.push(1);
        return 1;
    }

    public makeMove(id: number, cell: number): State {
        if (!this.state.players.find(el => el === id)) {
            throw new Error(`Player ${id} didn't join the game yet`);
        }
        if (id !== this.state.turn) {
            throw new Error(`Now its player ${this.state.turn} turn`);
        }
        if (cell < 0 || cell > 8) {
            throw new Error(`Invalid cell number ${cell}`);
        }
        if(this.state.board[cell] !== undefined) {
            throw new Error(`Cell ${cell} already has value ${this.state.board[cell]}`);
        }
        this.state.board[cell] = id;
        const playerWin = this.checkWin();
        if (playerWin) {
            console.log(`player ${playerWin} wins!`);
            this.resetGame();
        }
        else {
            this.state.turn = id === 1 ? 2 : 1;
        }
        return this.state;

    }

    private possibleWinningCells: Array<Array<number>> = [[0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]];
    

    private checkWin(): PlayerId | undefined {
        const players = [1,2];
        players.forEach(p => {
            if (this.possibleWinningCells.some(cells => cells.every(c => this.state.board[c] ===p ))) {
                return p;
            }
        })
        return undefined;

    }
}