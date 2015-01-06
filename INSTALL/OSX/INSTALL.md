Install KISS Web IDE Server
===========================

This guide describes how to install the Bot Web API Server on Mac OS X. The installation is currently tested with
* Mac OS X Yosemite

## 1 Manual Installation

### 1.1 Install third party libraries
**Note** This guide assumes that your document root is `/Library/WebServer/Documents`

1. Create a folder
  
  `sudo mkdir /Library/WebServer/Documents/libs`

2. Bootstrap:

  ```
sudo mkdir /Library/WebServer/Documents/libs/bootstrap
cd /Library/WebServer/Documents/libs/bootstrap 
sudo mkdir css
cd css
sudo curl "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" -o bootstrap.min.css
sudo curl "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css" -o bootstrap-theme.min.css
cd ..
sudo mkdir js
cd js
sudo curl "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js" -o bootstrap.min.js
cd ..
sudo mkdir fonts
cd fonts
sudo curl "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.woff" -o glyphicons-halflings-regular.woff
sudo curl "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.ttf" -o glyphicons-halflings-regular.ttf
```

3. jQuery:

  ```
sudo mkdir /Library/WebServer/Documents/libs/jquery
cd /Library/WebServer/Documents/libs/jquery
sudo curl "http://code.jquery.com/jquery-2.1.1.min.js" -o jquery-2.1.1.min.js
```

4. AngularJS:

  ```
sudo mkdir /Library/WebServer/Documents/libs/angularjs
cd /Library/WebServer/Documents/libs/angularjs
sudo curl "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular.min.js" -o angular.min.js
sudo curl "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular.min.js.map" -o angular.min.js.map
sudo curl "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular-route.min.js" -o angular-route.min.js
sudo curl "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular-route.min.js.map" -o angular-route.min.js.map
```

4. AngularUI:

  ```
sudo mkdir /Library/WebServer/Documents/libs/angularui
cd /Library/WebServer/Documents/libs/angularui
sudo curl "http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.12.0.min.js" -o ui-bootstrap-tpls-0.12.0.min.js
```

5. ACE:

  Clone the ACE project into `/Users/stefan/Documents/ace-builds` or adjust the following paths accordingly
  ```
cd /Users/stefan/Documents
git clone https://github.com/ajaxorg/ace-builds.git
sudo mkdir /Library/WebServer/Documents/libs/ace-build
cd /Library/WebServer/Documents/libs/ace-build
sudo ln -s /Library/WebServer/Documents/libs/ace-build ace-build
```

6. Base64:
  1. Create a folder ` /Library/WebServer/Documents/libs/base64`
  2. Copy the sources from http://www.webtoolkit.info/javascript-base64.html#.VKnd5yvF965 into ` /Library/WebServer/Documents/libs/base64/base64.js`

### 1.2 Prepare the development environment

#### Clone the KISS Web IDE project

Note: We will assume that you clone the project into `/Users/stefan/Documents`

```
cd /Users/stefan/Documents
git clone https://github.com/kipr/kisswebide.git
```

#### Link KISS Web IDE into the system
```
sudo ln -s /Users/stefan/Documents/kisswebide/api /Library/WebServer/Documents/kisswebide
```

## 2 Launch the Apache server
```
sudo launchctl load -w /System/Library/LaunchDaemons/org.apache.httpd.plist 
```

## 3 Open the KISS Web IDE
Open http://127.0.0.1/kisswebide in a browser
