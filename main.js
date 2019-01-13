/* my wazapp */
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const {Menu, Tray} = require('electron')
const gotTheLock = app.requestSingleInstanceLock()


///second instance behaviour
app.on('second-instance', (commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
   if (mainWindow.window) {
                if (mainWindow.window.isMinimized()) {
                    mainWindow.window.restore();
                }
                mainWindow.window.show();
            }
})

if (!gotTheLock) {
  return app.quit()
}


//panel icon
let tray = null
  app.on('ready', () => {
    tray = new Tray(path.join(__dirname, 'app/icons/icon.png'))
    const contextMenu = Menu.buildFromTemplate([

      {
      label: 'Hide',
      click: () => { mainWindow.hide();}
      },
      {
        type: 'separator'
      },
      {
      label: 'Show',
      click: () => {mainWindow.show();}
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        click: () => {app.quit();}
       }

    ])
    tray.setToolTip('WazApp.')

    tray.setContextMenu(contextMenu)
})




// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "WazApp",
    autoHideMenuBar: false,
    icon: path.join(__dirname, 'app/icons/icon.png'),
    show:true
})

//set user agent of browser #avoid whatsapp error on chromium browser
mainWindow.webContents.setUserAgent("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36");



  // and load the index.html of the app.
  mainWindow.loadFile('index.html')




   //notifications
   mainWindow.on('page-title-updated', osLinux((event, title) => {

      var msgCount = title.match(/\((\d+)\)/);
      msgCount = msgCount ? msgCount[1] : '';

     if (parseInt(msgCount) > 0) {
     tray.setImage(path.join(__dirname, 'app/icons/iconmsg.png'));

     }else{
         tray.setImage(path.join(__dirname, 'app/icons/icon.png'));

     }

 }))




  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

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
  if (mainWindow === null) {
    createWindow()
  }
})

//*Utility functions*/

global.osLinux = function(callback) {
       if (process.platform === 'linux') {
           return Function.bind.apply(callback, this, [].slice.call(arguments, 0));
       }
       return function() {};
}
