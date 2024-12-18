import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  sendMessage: (channel: string, data: any) => ipcRenderer.send(channel, data),
  onMessage: (channel: string, callback: (event: any, data: any) => void) =>
    ipcRenderer.on(channel, callback),
});
