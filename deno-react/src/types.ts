export type GameState = {
	cellValues: number[]
}

export type CellChangedResponse = {
  playerNumber: number;
  cellNumber: number;
  value: string;
};
