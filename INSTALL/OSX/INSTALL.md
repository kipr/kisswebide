Install KISS Web IDE Server
===========================

This guide describes how to install the Bot Web API Server on Mac OS X. The installation is currently tested with
* Mac OS X Yosemite

## 1 Manual Installation
### 1.1 Prepare the development environment

#### Clone the KISS Web IDE project

Note: We will assume that you clone the project into `/Users/stefan/Documents`

```
cd /Users/stefan/Documents
git clone https://github.com/kipr/kisswebide.git
```

#### Link KISS Web IDE and the third-party libraries into the system
```
sudo ln -s /Users/stefan/Documents/kisswebide/app /Library/WebServer/Documents/kisswebide
sudo ln -s /Users/stefan/Documents/kisswebide/INSTALL/libs /Library/WebServer/Documents/libs
```

## 2 Launch the Apache server
```
sudo launchctl load -w /System/Library/LaunchDaemons/org.apache.httpd.plist 
```

## 3 Open the KISS Web IDE
Open http://127.0.0.1/kisswebide in a browser
