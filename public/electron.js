const {
    app,
    BrowserWindow
} = require('electron');
const isDev = require('electron-is-dev');
const path  = require('path');

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 900,
        height: 700
    });

    // and load the index.html of the app.
    win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

    //win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});