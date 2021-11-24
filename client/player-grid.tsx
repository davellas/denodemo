import React from 'https://jspm.dev/react';

import { CellChangedResponse } from "./types.ts"
import { PlayerGridCell } from "./player-grid-cell.tsx"
import "./player-grid.css"

type PlayerGridProps = {
	playerNumber: number
}

export const PlayerGrid = (props: PlayerGridProps) => {

	const cellChangedCB = (resp: CellChangedResponse) => {
		console.log(`Player #${props.playerNumber} clicked cell! response = ${resp}`)
	}

	const getPlayerGridCell = (cellNumber: number) => {
		return <PlayerGridCell
			cellNumber={cellNumber}
			playerNumber={props.playerNumber}
			callback={cellChangedCB} />
	}

	return (
		<div className="grid">
			<div className="grid-row grid-row-1">
				{getPlayerGridCell(0)}
				{getPlayerGridCell(1)}
				{getPlayerGridCell(2)}
			</div>

			<div className="grid-row grid-row-2">
			  {getPlayerGridCell(3)}
				{getPlayerGridCell(4)}
				{getPlayerGridCell(5)}
			</div>

			<div className="grid-row grid-row-2">
		  	{getPlayerGridCell(6)}
				{getPlayerGridCell(7)}
				{getPlayerGridCell(8)}
			</div>
		</div>
	)
}