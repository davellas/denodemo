import React from 'react';
import logo from './logo.svg';
import './App.css';

import { PlayerGrid } from "./player-grid";

function App() {

  const playerNumber: number = 1 // join(...)

  return <PlayerGrid playerNumber={playerNumber} />
}

export default App;
