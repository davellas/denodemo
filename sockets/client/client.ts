export const logErrorClient = (msg: string) => {
  console.log(msg);
};
<<<<<<< HEAD
export const connectedClient = (ws: WebSocket) => {
  console.log('Connected to server ...');
  messageClient(ws, 'Welcome!');
}
;
export const messageClient = (ws: WebSocket, data: string) => {
  console.log('SERVER >> ' + data);
  const reply = prompt('Client >> ') || 'No reply';
  if (reply === 'exit') return ws.close();
=======
const connectedClient = (ws: WebSocket) => {
  console.log("Connected to server ...");
  messageClient(ws, "Welcome!");
};
const messageClient = (ws: WebSocket, data: string) => {
  console.log("SERVER >> " + data);
  const reply = prompt("Client >> ") || "No reply";
  if (reply === "exit") return ws.close();
>>>>>>> f0ada8cc779b00ef1a4864dd92e2411f1fba8b49
  ws.send(reply as string);
};
export const errorClient = (e: Event | ErrorEvent) =>
  console.log(e instanceof ErrorEvent ? e.message : e.type);
<<<<<<< HEAD
console.log('Connecting to server ...');

=======
console.log("Connecting to server ...");
>>>>>>> f0ada8cc779b00ef1a4864dd92e2411f1fba8b49
try {
  const ws = new WebSocket("ws://localhost:8000/ws");
  ws.onopen = () => connectedClient(ws);
  ws.onmessage = (m) => messageClient(ws, m.data);
  ws.onclose = () => logErrorClient("Disconnected from server ...");
  ws.onerror = (e) => errorClient(e);
} catch (err: unknown) {
  logErrorClient(`Failed to connect to server ... exiting with ${err}`);
}
