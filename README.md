# Wazapp
Build your linux  client for WhatsApp. 
Unfortunately there is no official Whatsapp client for Linux operating systems. But we are a Linux users, if it is not exists, we will create it :) 

**It is not an official application of WhatsApp Inc.**

This is a created with [Electron](https://electronjs.org/) 



## To Use
To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:
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
