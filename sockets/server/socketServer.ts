const handleError = (e: Event | ErrorEvent) =>
  console.log(e instanceof ErrorEvent ? e.message : e.type);

export function setupWs(req: Request): Response {
  const { socket: ws, response } = Deno.upgradeWebSocket(req);
  ws.onopen = () => connected();
  ws.onmessage = (m) => message(ws, m.data);
  ws.onclose = () => logError("Disconnected from client ...");
  ws.onerror = (e) => handleError(e);
  return response;
}

const logError = (msg: string) => {
  console.log(msg);
  Deno.exit(1);
};

const connected = () => console.log("Connected to client ...");

const message = (ws: WebSocket, data: string) => {
  console.log("CLIENT >> " + data);
  const reply = prompt("Server >> ") || "No reply";
  if (reply === "exit") return ws.close();
  ws.send(reply as string);
};
