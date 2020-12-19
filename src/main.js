const electron = require('electron'),
    app = electron.app,
    BrowserWindow = electron.BrowserWindow,
    Menu = electron.Menu,
    path = require('path');

let window ;
app.on('ready',  function(){

    console.log('ready')

    window = new BrowserWindow()

    let fileName =  path.join(`${__dirname}`,'index.html');

    let fileURL = 'file://'+fileName

    console.log(fileURL);

    window.loadURL(fileURL);

    window.on('closed', _  => {

    })
})