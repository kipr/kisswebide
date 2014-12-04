Install KISS Web IDE Server (Apple OS X)
===============================

## Clone the project

Note: We will assume that you clone the project into `/Users/stefan/Documents`

```
$ git clone https://github.com/kipr/kisswebide.git
```

## Setup and start the Apache server
Follow https://discussions.apple.com/docs/DOC-3083 to setup an Apache user directory web server

Note: We will assume that your document root of your web server is `/Users/stefan/Sites``

## Link the KISS Web IDE into the system

```
$ cp -r /Users/stefan/Documents/kisswebide/api /Users/stefan/Sites/kisswebide
```

## Test it
Enter `http://localhost/kisswebide` in your web browser address bar to open the KISS Web IDE
