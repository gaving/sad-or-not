const { app, BrowserWindow, Menu, Tray, ipcMain } = require("electron");

const path = require("path");
const url = require("url");
const ICON_PATH = path.join(__dirname, "resources/icon.png");

let mainWindow, appIcon;

const shouldQuit = app.makeSingleInstance(commandLine => {
  let args = commandLine;
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

if (shouldQuit) {
  app.quit();
}

process.on("uncaughtException", error => {
  console.error(`ERROR Exception => ${error.stack}`);
});

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Happy?",
    width: 800,
    height: 800,
    resizable: false,
    frame: false,
    show: false,
    alwaysOnTop: true,
    icon: ICON_PATH,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../../build/index.html"),
      protocol: "file:",
      slashes: true
    });

  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  appIcon = new Tray(ICON_PATH);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit",
      accelerator: "Ctrl+Q",
      role: "quit",
      click() {
        appIcon.destroy();
      }
    }
  ]);
  appIcon.setToolTip("Happy?");
  appIcon.setContextMenu(contextMenu);

  setTimeout(() => {
    appIcon.displayBalloon({
      icon: ICON_PATH,
      title: "Psssst... have you a minute?",
      content: "Click here!"
    });
  }, 2000);

  appIcon.on("balloon-click", () => {
    mainWindow.show();
    mainWindow.focus();
  });
  appIcon.on("click", () => {
    mainWindow.show();
    mainWindow.focus();
  });
  appIcon.on("blur", () => {
    window.hide();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

ipcMain.on("quit", (event, arg) => {
  app.quit();
});

ipcMain.on("progress", (event, arg) => {
  mainWindow.setProgressBar(arg);
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
