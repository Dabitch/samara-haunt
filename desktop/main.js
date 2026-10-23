const { app, BrowserWindow, globalShortcut, screen, ipcMain } = require("electron");
const path = require("path");

let win;
const INTERVAL_MS = 3 * 60 * 60 * 1000; // 3 hours

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width: 420,
    height: 520,
    x: 100,
    y: 100,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false,
    resizable: false,
    movable: false,
    hasShadow: false,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setAlwaysOnTop(true, "screen-saver");
  win.loadFile(path.join(__dirname, "index.html"));

  win.webContents.on("did-finish-load", () => {
    scheduleNext();
  });
}

function randomPosition() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const w = 420, h = 520;
  const x = Math.floor(Math.random() * Math.max(1, width - w));
  const y = Math.floor(Math.random() * Math.max(1, height - h - 40));
  return { x, y };
}

function showSamara() {
  if (!win) return;
  win.setBounds({ ...randomPosition(), width: 420, height: 520 });
  win.showInactive();
  win.webContents.send("play");
}

function glitchAndHide() {
  if (!win) return;
  const { width, height } = screen.getPrimaryDisplay().bounds;
  win.setBounds({ x: 0, y: 0, width, height });
  win.webContents.send("glitch");
  setTimeout(() => {
    if (win) win.hide();
  }, 450);
}

function scheduleNext() {
  setTimeout(() => {
    showSamara();
    scheduleNext();
  }, INTERVAL_MS);
}

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register("CommandOrControl+Shift+S", () => showSamara());
  globalShortcut.register("CommandOrControl+Shift+R", () => {
    if (win) win.hide();
  });

  ipcMain.on("dismiss", () => glitchAndHide());
  ipcMain.on("ready", () => {
    setTimeout(showSamara, 2000);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});