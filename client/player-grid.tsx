import React, { useState } from 'https://jspm.dev/react';

import { CellChangedResponse, GameState } from "./types.ts"
import { PlayerGridCell } from "./player-grid-cell.tsx"
import { connectedClient, messageClient } from "../sockets/client/client.ts"

// import "./player-grid.css"

type PlayerGridProps = {
	playerNumber: number
}

const initGameState: GameState = {
	cellValues: [0,0,0, 0,0,0, 0,0,0]
}

const mapCellStringToInt = (s: string) => {
	if (s == "") return 0
	else if (s == "x") return 1
	else if (s == "o") return 2
	else throw new Error(`Illegal symbol for tic-tac-toe: "${s}"`)
}

export const PlayerGrid = (props: PlayerGridProps): any => {

	const [gameState, setGameState] = useState(initGameState)
	// const [webSocket, setWebSocket] = useState(new WebSocket('ws://localhost:8000/ws'))

	// const initWSConnection = () => {
	// 	console.log(`Initialize ws for client: Player #${props.playerNumber}`)
	// 	connectedClient(webSocket)
	// 	messageClient(webSocket, "What's happening over here?")
	// }

	// Reinstate when ws server can be run:
	// initWSConnection()

	const cellChangedCB = (resp: CellChangedResponse) => {
		console.log(`Player #${props.playerNumber} clicked cell! response = ${resp}`)
		const newGameState = gameState as GameState
		newGameState.cellValues[resp.cellNumber] = mapCellStringToInt(resp.value)
		setGameState(newGameState)
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