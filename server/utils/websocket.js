import { WebSocketServer, WebSocket } from "ws";

let wss = null;

export function initializeWebSocket(port) {
  if (!wss) {
    try {
      wss = new WebSocketServer({ port });
      console.log(`[WS] Listening on ws://localhost:${port}`);

      wss.on("connection", (ws, req) => {
        console.log("[WS] Client connected:", req?.headers?.origin || "unknown");
        ws.on("close", () => console.log("[WS] Client disconnected"));
        ws.on("error", (err) => console.error("[WS] Client error:", err));
      });

      wss.on("error", (err) => {
        console.error("[WS] Server error:", err);
      });
    } catch (e) {
      console.error("[WS] Failed to start:", e);
    }
  }
  return wss;
}

export function getWebSocketServer() {
  if (!wss) throw new Error("WebSocket Server not initialized");
  return wss;
}

export function sendProgress(progress, message) {
  if (!wss) return console.error("[WS] Not initialized");
  console.log(`[WS] Broadcast to ${wss.clients.size} client(s): ${progress}% - ${message}`);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ progress, message }));
    }
  });
}
