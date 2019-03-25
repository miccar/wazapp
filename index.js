"use strict";

const fs = require('fs')
const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')
const gotTheLock = app.requestSingleInstanceLock()

var wscc = null, tray = null


if (!gotTheLock) {
	return app.quit()
}


///second instance behaviour
app.on('second-instance', (commandLine, workingDirectory) => {
	// Someone tried to run a second instance, we should focus our window.
	if (wscc.window) {
		if (wscc.window.isMinimized()) {
			wscc.window.restore();
		}
		wscc.window.show();
	}
})

//panel icon
app.on('ready', () => {
	tray = new Tray(path.join(__dirname, 'assets/icons/icon.png'))
	const contextMenu = Menu.buildFromTemplate([{
			label: 'Hide',
			click: () => { wscc.hide(); }
		}, {
			type: 'separator'
		}, {
			label: 'Show',
			click: () => { wscc.show(); }
		}, {
			type: 'separator'
		}, {
			label: 'Quit',
			click: () => { app.quit(); }
		}
	])
	tray.setToolTip('WazApp.')
	tray.setContextMenu(contextMenu)
	tray.on("double-click", function(event){
		wscc.show();
	})
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (wscc === null) {
		createWindow()
	}
})



//*Utility functions*/

global.osLinux = function (callback) {
	if (process.platform === 'linux') {
		return Function.bind.apply(callback, this, [].slice.call(arguments, 0));
	}
	return function () { };
}



function createWindow() {
	// Create the browser window.
	wscc = new BrowserWindow({
		minWidth: 500,
		minHeight: 600,
		width: 500,
		height: 600,
		backgroundColor: '#2c2c2c',
		title: "WhatSapp",
		autoHideMenuBar: true,
		icon: path.join(__dirname, 'assets/icons/icon.png'),
		show: true
	})

	wscc.maximize()
	wscc.setMenuBarVisibility(false);

	//set user agent of browser #avoid whatsapp error on chromium browser
	wscc.webContents.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36")
	wscc.loadURL("https://web.whatsapp.com");


	//notifications
	wscc.on('page-title-updated', osLinux((event, title) => {
		var msgCount = title.match(/\((\d+)\)/);
		msgCount = msgCount ? msgCount[1] : '';
		if (parseInt(msgCount) > 0) {
			tray.setImage(path.join(__dirname, 'assets/icons/iconmsg.png'));
		} else {
			tray.setImage(path.join(__dirname, 'assets/icons/icon.png'));
		}
	}))

	wscc.webContents.on('dom-ready', function (e) {
		let js_content = fs.readFileSync(path.join(__dirname, 'assets/init.js'), 'utf8')
		let css_content = fs.readFileSync(path.join(__dirname, 'assets/styles.css'), 'utf8')
		js_content = js_content.replace('{MY_CUSTOM_STYLE}', '`' + css_content + '`')
		wscc.webContents.executeJavaScript(js_content);
	})

	// Open the DevTools.
	// window.webContents.openDevTools()

	// Emitted when the window is closed.
	wscc.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		wscc = null
	})
}