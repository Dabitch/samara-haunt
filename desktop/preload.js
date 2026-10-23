const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("samara", {
  onPlay: (cb) => ipcRenderer.on("play", cb),
  dismiss: () => ipcRenderer.send("dismiss"),
  ready: () => ipcRenderer.send("ready"),
});
