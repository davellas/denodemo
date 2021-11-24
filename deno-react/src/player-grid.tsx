import React, { useState, useEffect } from 'react';

import { CellChangedResponse, GameState } from "./types"
import { PlayerGridCell } from "./player-grid-cell"

import { connectedClient, messageClient } from "./client"

import "./player-grid.css"

type PlayerGridProps = {
  playerNumber: number;
};

const initGameState: GameState = {
	cellValues: [0,0,0, 0,0,0, 0,0,0]
}

const mapCellStringToInt = (s: string) => {
	if (s === "") return 0
	else if (s === "x") return 1
	else if (s === "o") return 2
	else throw new Error(`Illegal symbol for tic-tac-toe: "${s}"`)
}

const host = 'http://localhost:8081'

export const PlayerGrid = (props: PlayerGridProps): any => {

	const [gameState, setGameState] = useState(initGameState)
	const [webSocket, setWebSocket] = useState(new WebSocket('ws://localhost:8000/ws'))
	const [playerNumber, setPlayerNumber] = useState(-1)

	const join = async () => {
		console.log("joined?")
		try {
			const result = await fetch(`${host}/join`)
			setPlayerNumber(parseInt(await result.text()))
		} catch (err) {
			console.log(err)
		}
	}
	// const initWSConnection = () => {
	// 	console.log(`Initialize ws for client: Player #${props.playerNumber}`)
	// 	connectedClient(webSocket)
	// 	messageClient(webSocket, "What's happening over here?")
	// }

	// // Reinstate when ws server can be run:
	// initWSConnection()

	useEffect(() => {
		join()
	},[])


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
		<div>
		{playerNumber > -1 && <div className="grid">
			<div>PlayerNumber: {playerNumber}</div>
			<div className="grid-row grid-row-1">
				{Array.from(Array(3).keys()).map(number => <PlayerGridCell key={number} cellNumber={number} playerNumber={props.playerNumber} callback={cellChangedCB} />)}
			</div>

			<div className="grid-row grid-row-2">
			{Array.from(Array(3).keys()).map(number => <PlayerGridCell key={number+3} cellNumber={number+3} playerNumber={props.playerNumber} callback={cellChangedCB} />)}
			</div>

			<div className="grid-row grid-row-2">
			{Array.from(Array(3).keys()).map(number => <PlayerGridCell key={number+6} cellNumber={number+6} playerNumber={props.playerNumber} callback={cellChangedCB} />)}
			</div>
		</div>}
		{playerNumber == -1 && <div>Still joining game</div>}
		</div>
	)
}
