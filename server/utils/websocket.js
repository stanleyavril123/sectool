import { WebSocketServer } from "ws";

let wss = null;

export function initializeWebSocket(port) {
  if (!wss) {
		wss = new WebSocketServer({ port });

		wss.on("connection", (ws) => {
			console.log("Client connected to WebSocket");
	
			ws.on("close", () => {
				console.log("Client disconnected");
			});
		});
  }
  return wss;
}

export function getWebSocketServer() {
	if (!wss) {
		throw new Error("WebSocket Server not initialized")
	}
	return wss;
}

export function sendProgress(progress, message) {
  if (!wss || !wss.clients) {
    console.error("WebSocket Server not initialized");
    return;
  }

  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify({ progress, message }));
    }
  });

	console.log(`Progress sent: ${progress}% - ${message}`); // DEBUG
}
