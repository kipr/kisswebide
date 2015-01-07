Install KISS Web IDE Server
===========================

This guide describes how to install the Bot Web API Server on Microsoft Windows. The installation is currently tested with
* Microsoft Windows 8.1

## 1 Manual Installation

### 1.1 Install missing applications

#### Install Lighttpd
**Note:** You can skip this step if you already have installed Lighttpd. Lighttpd is installed when you install the Bot Web API.

We will use [Lighttpd](http://redmine.lighttpd.net/) as web server as it does not require an installation.

1. Download [version 1.4.35](http://lighttpd.dtech.hu/LightTPD-1.4.35-1-IPv6-Win32-SSL.zip) or the latest version from [here](http://redmine.lighttpd.net/projects/1/wiki/tutoriallighttpdandphp#Windows).
2. Extract the archive content into `C:\LightTPD`. If you choose another path you have to adapt the following steps.

#### Install git
If not already done, install your favorite git tool (e.g. [git](http://git-scm.com/downloads), [SourceTree](http://www.sourcetreeapp.com/), [GitHub for Windows](https://windows.github.com/))

### 1.2 Prepare the development environment

#### Clone the KISS Web IDE project
Clone `https://github.com/kipr/kisswebide.git` with your git tool. The subsequent steps will assume that you cloned it into `C:\Users\stefan\Documents\Projects\kisswebide`

#### Patch the config files, the third-party libraries and link KISS Web IDE into the system
Open a Command Prompt as administrator and type:

```
C:\WINDOWS\system32>mklink /D C:\LightTPD\htdocs\kisswebide C:\Users\stefan\Documents\Projects\kisswebide\app
C:\WINDOWS\system32>mklink /D C:\LightTPD\htdocs\libs C:\Users\stefan\Documents\Projects\kisswebide\INSTALL\libs
```

## 2 Launch the LightTPD server
Navigate to `C:\LightTPD` and launch (double click) on `LightTPD.exe`

## 3 Open the KISS Web IDE
Open http://127.0.0.1/kisswebide in a browser

## 4 Launch a compiled application
As there is no simulatior available yet, you need to start the applications by hand:

1. Open a Command Prompt and change to the project directory `cd <project>`
2. If your application uses libkovan functions (**Note that just the camera and the depth display is working without the simulator**): Copy the dlls with `copy "C:\Program Files (x86)\KISS Platform 5.1.2\KISS"\*.dll .\`
3. Launch the executable `<project>.exe`
