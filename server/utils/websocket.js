import { WebSocketServer } from "ws";

export function initializeWebSocket(port) {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket");

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  return wss;
}

export function sendProgress(wss, progress, message) {
  if (!wss || !wss.clients) {
    console.error("WebSocket server (wss) is not initialized.");
    return;
  }

  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify({ progress, message }));
    }
  });
}
