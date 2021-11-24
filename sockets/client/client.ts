const logErrorClient = (msg: string) => {
  console.log(msg);
};
const connectedClient = (ws: WebSocket) => {
  console.log("Connected to server ...");
  messageClient(ws, "Welcome!");
};
const messageClient = (ws: WebSocket, data: string) => {
  console.log("SERVER >> " + data);
  const reply = prompt("Client >> ") || "No reply";
  if (reply === "exit") return ws.close();
  ws.send(reply as string);
};
const errorClient = (e: Event | ErrorEvent) =>
  console.log(e instanceof ErrorEvent ? e.message : e.type);
console.log("Connecting to server ...");
try {
  const ws = new WebSocket("ws://localhost:8000/ws");
  ws.onopen = () => connectedClient(ws);
  ws.onmessage = (m) => messageClient(ws, m.data);
  ws.onclose = () => logErrorClient("Disconnected from server ...");
  ws.onerror = (e) => errorClient(e);
} catch (err: unknown) {
  logErrorClient(`Failed to connect to server ... exiting with ${err}`);
}
