'use strict';
 
const electron = require("electron");
const appExpress = require("./app");

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('window-all-closed', function() {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('ready', function() {
	mainWindow = new BrowserWindow({width: 800, height: 600});
	// mainWindow.setFullScreen(true);
	mainWindow.loadURL('http://127.0.0.1:3000');
	// mainWindow.maximize()

	// Open the DevTools.
  	mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});