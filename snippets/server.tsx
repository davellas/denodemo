import React from "https://jspm.dev/react";

import pogo from "https://deno.land/x/pogo/main.ts";
import { createAsyncGenerator } from "./streaming.ts";
import { PlayerGrid } from "./client/player-grid.tsx";

const server = pogo.server({ port: 8000 });

server.router.get("/", () => {
  return "Hello, world!";
});

server.router.get("/react", () => {
  return <div>hello react</div>;
});

// server.router.get('/streaming', streamingHandler);

console.log("Starting server...");

// FIXME
// server.router.get('/player1', () => {
//     return <PlayerGrid playerNumber={"1"} />
// }

await server.start();

console.log("Server is listening on ");
