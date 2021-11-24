const logErrorClient = (msg:string) => {
    console.log(msg);
    Deno.exit(1);
};
const handleConnectedClient = (ws: WebSocket) => {
    console.log("Connected to server ...");
    handleMessageClient(ws, 'Welcome!');
}
const handleMessageClient = (ws:WebSocket, data:string) => {
    console.log("SERVER >> " + data);
    const reply = prompt("Client >> ") || "No reply";
    if (reply === "exit")
        return ws.close();
    ws.send(reply as string);
}
const handleErrorClient = (e:Event|ErrorEvent) => console.log(e instanceof ErrorEvent ? e.message : e.type);
console.log("Connecting to server ...");
try {
    const ws=new WebSocket("ws://localhost:9000");
    ws.onopen=()=>handleConnectedClient(ws);
    ws.onmessage=m=>handleMessageClient(ws, m.data);
    ws.onclose=()=>logErrorClient("Disconnected from server ...");
    ws.onerror=e=>handleErrorClient(e);
} catch (err) {
    logErrorClient("Failed to connect to server ... exiting");
}