const electron =require('electron');
const {app, BrowserWindow}=electron;
const url=require('url');
const path=require('path');

require('electron-reload')(__dirname,{
    electron:path.join(__dirname,'node_modules','.bin','electron')
});

let windowObj=null;

//function to create the application window
function createWindow(){
    windowObj=new BrowserWindow({
        width:500,
        height:550,
        alwaysOnTop:true,
        minimizable:false,
        maximizable:false,
        center:true,
        autoHideMenuBar:true,
        resizable:false,
        frame:false
    });

    windowObj.loadURL(url.format(path.join(__dirname,'dot_and_box.html')));

    windowObj.on('closed',function(){
        windowObj=null;
    })
}

app.on('ready',createWindow);