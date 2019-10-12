# WSCC (Wazapp Custom Client)

### **It is not an official application of WhatsApp Inc.**

Build your own custom client for WhatsApp.

Unfortunately there is no official Whatsapp client for Linux operating systems. But we are a Linux users, if it is not exists, we will create it.

This is created with [Electron](https://electronjs.org/) v6.

## Changelog:

### v3.0.0

### Features
1. Custom styles, you can make your own style or you can apply any of [usertstyles.com](https://userstyles.org/styles/browse?search_terms=whatsapp&type=false).
2. If you have a version error with your browser, the program will solve it automatically.
3. Dependency node-notifier was removed.
4. Electron has been updated to version 4.
5. All builds will be saved in the release folder.

### Environment for dev
1. main.js has been renamed to index.js
2. app has been renamed to assets
3. .gitignore has been added

## How to use

Clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:
```bash
# Clone this repository
git clone https://github.com/miccar/wazapp
# Go into the repository
cd wazapp
# Install dependencies
npm install
# Run the app
npm start
```

## Create linux executable file
```bash
# Create package for linux 64bit
npm run build-linux64
# Create package for linux 32bit
npm run build-linux32
```
This command will create a folder called Wazapp-linux32(64) that contains the executable file. Now you have to include this file as a startup application of your Linux operating system 

## NOTE
If it is not already installed, you have to include electron-packager for creating the linux executable file with the following command: 

```bash
#install the dependency 
npm install electron-packager
```
## WazApp on Ubuntu Linux
The app starts in Hide mode(a background mode, only the icon on the panel is showed and the new message will be notified).
Clicking on the _Show_ item, the app will be open.
 ![alt text](https://github.com/miccar/wazapp/blob/2%2C0/images/wazapp.jpg)
