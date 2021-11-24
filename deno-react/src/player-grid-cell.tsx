import React, { useState } from "react";
import { CellChangedResponse } from "./types";

type PlayerGridCellProps = {
  cellNumber: number;
  playerNumber: number;
  callback: (p: CellChangedResponse) => void;
};

const format = (str: string) => {
}

const nextValues = (s: string) => {
  // Round-robin through possible values by clicking the cell:
  if (s === "") return "x";
  else if (s === "x") return "o";
  else if (s === "o") return "";
  else throw new Error(`Illegal symbol for tic-tac-toe: "${s}"`);
};

export const PlayerGridCell = (props: PlayerGridCellProps) => {
  const [value, updateValue] = useState("");

  const _updateValue = () => {
    const nextValue = nextValues(value);
    updateValue(nextValues(value));
    props.callback({
      cellNumber: props.cellNumber,
      playerNumber: props.playerNumber,
      value: nextValue,
    });
  };

  return (
    <div className="grid-cell" onClick={_updateValue}>
      {value === "" ? " " : value}
    </div>
  );
};
