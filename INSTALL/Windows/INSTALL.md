Install KISS Web IDE Server
===========================

This guide describes how to install the Bot Web API Server on Microsoft Windows. The installation is currently tested with
* Microsoft Windows 8.1

## 1 Manual Installation

### 1.2 Install missing applications

#### Install Lighttpd
**Note:** You can skip this step if you already have installed Lighttpd. Lighttpd is installed when you install the Bot Web API.

We will use [Lighttpd](http://redmine.lighttpd.net/) as web server as it does not require an installation.

1. Download [version 1.4.35](http://lighttpd.dtech.hu/LightTPD-1.4.35-1-IPv6-Win32-SSL.zip) or the latest version from [here](http://redmine.lighttpd.net/projects/1/wiki/tutoriallighttpdandphp#Windows).
2. Extract the archive content into `C:\LightTPD`. If you choose another path you have to adapt the following steps.

#### Install git
If not already done, install your favorite git tool (e.g. [git](http://git-scm.com/downloads), [SourceTree](http://www.sourcetreeapp.com/), [GitHub for Windows](https://windows.github.com/))

### 1.2 Install third party libraries

1. Create a folder `C:\LightTPD\htdocs\libs`
2. Bootstrap:
  1. Create a folder `C:\LightTPD\htdocs\libs\bootstrap`
  2. Create a folder `C:\LightTPD\htdocs\libs\bootstrap\css`
  3. Download https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css into `C:\LightTPD\htdocs\libs\bootstrap\css\bootstrap.min.css`
  4. Download https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css into `C:\LightTPD\htdocs\libs\bootstrap\css\bootstrap-theme.min.css`
  5. Create a folder `C:\LightTPD\htdocs\libs\bootstrap\js`
  6. Download https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js into `C:\LightTPD\htdocs\libs\bootstrap\js\bootstrap.min.js`
  7. Create a folder `C:\LightTPD\htdocs\libs\bootstrap\fonts`
  8. Download https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.woff into `C:\LightTPD\htdocs\libs\bootstrap\fonts\glyphicons-halflings-regular.woff`
  9. Download https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.ttf  into `C:\LightTPD\htdocs\libs\bootstrap\fonts\glyphicons-halflings-regular.ttf `
3. jQuery:
  1. Create a folder `C:\LightTPD\htdocs\libs\jquery`
  2. Download http://code.jquery.com/jquery-2.1.1.min.js into `C:\LightTPD\htdocs\libs\jquery\jquery-2.1.1.min.js`
4. AngularJS:
  1. Create a folder `C:\LightTPD\htdocs\libs\angularjs`
  2. Download http://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular.min.js into `C:\LightTPD\htdocs\libs\angularjs\angular.min.js`
  3. Download http://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular.min.js.map into `C:\LightTPD\htdocs\libs\angularjs\angular.min.js.map`
  4. Download http://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular-route.min.js into `C:\LightTPD\htdocs\libs\angularjs\angular-route.min.js`
  5. Download http://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular-route.min.js.map into `C:\LightTPD\htdocs\libs\angularjs\angular-route.min.js.map`
4. AngularUI:
  1. Create a folder `C:\LightTPD\htdocs\libs\angularui`
  2. Download http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.12.0.min.js into `C:\LightTPD\htdocs\libs\angularui\ui-bootstrap-tpls-0.12.0.min.js`
5. ACE:
  1. Clone the ACE project `https://github.com/ajaxorg/ace-builds.git` with your git tool. The subsequent steps will assume that you cloned it into `C:\Users\stefan\Documents\Projects\ace-builds`
6. Base64:
  1. Create a folder `C:\LightTPD\htdocs\libs\base64`
  2. Copy the sources from http://www.webtoolkit.info/javascript-base64.html#.VKnd5yvF965 into `C:\LightTPD\htdocs\libs\base64\base64.js`

### 1.3 Prepare the development environment

#### Clone the KISS Web IDE project
Clone `https://github.com/kipr/kisswebide.git` with your git tool. The subsequent steps will assume that you cloned it into `C:\Users\stefan\Documents\Projects\kisswebide`

#### Patch the config files and link KISS Web IDE into the system
Open a Command Prompt as administrator and type:

```
C:\WINDOWS\system32>mklink C:\LightTPD\htdocs\index.html C:\Users\stefan\Documents\Projects\kisswebide\index.html
C:\WINDOWS\system32>mklink /D C:\LightTPD\htdocs\kisswebide C:\Users\stefan\Documents\Projects\kisswebide\kisswebide
C:\WINDOWS\system32>mklink /D C:\LightTPD\htdocs\ace-builds C:\Users\stefa_000\Documents\Projects\ace-builds
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
