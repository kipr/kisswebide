Install KISS Web IDE Server
===========================

This guide describes how to install the KISS Web IDE Server on the KIPR Link.

## 1 Manual installation / installation for developer or contributor

**Note:** This is the only way to install KISS Web IDE Server on a Link with firmware 2.0.3 or below.

### 1.1 Create swap file

**Note:** You can skip these steps if you already installed the Bot Web Api

Create the swap file
```Shell
root@kovan:~# dd if=/dev/zero of=/swapfile bs=1024 count=262144
root@kovan:~# mkswap /swapfile
root@kovan:~# swapon /swapfile
```

Add the following line to `/etc/fstab`
```
/swapfile            none                 swap       defaults              0  0
```

### 1.2 Install missing packets

**Note:** You can skip these steps if you already installed the Bot Web Api

#### Install wget
```Shell
root@kovan:~# opkg install http://netv.bunnie-bar.com/build/kovan-debug/LATEST/armv5te/wget_1.13.4-r13.1_armv5te.ipk
```

#### Install curl
```Shell
root@kovan:~# opkg install http://netv.bunnie-bar.com/build/kovan-debug/LATEST/armv5te/libcurl5_7.23.1-r0_armv5te.ipk
root@kovan:~# opkg install http://netv.bunnie-bar.com/build/kovan-debug/LATEST/armv5te/curl_7.23.1-r0_armv5te.ipk
```

#### Install CA certificates
```Shell
root@kovan:~# mkdir -p /etc/ssl/certs
```

Add the following to the end of file */etc/profile*
```Shell
export SSL_CERT_DIR=/etc/ssl/certs
```

```Shell
root@kovan:~# source /etc/profile
root@kovan:~# opkg install http://netv.bunnie-bar.com/build/kovan-debug/LATEST/armv5te/openssl-misc_1.0.0g-r15.0_armv5te.ipk
root@kovan:~# cd /etc/ssl/certs
root@kovan:/etc/ssl/certs# curl http://curl.haxx.se/ca/cacert.pem -o cacert.pem
root@kovan:/etc/ssl/certs# awk 'split_after==1{n++;split_after=0} /-----END CERTIFICATE-----/ {split_after=1} {print > "cert" n ".pem"}' cacert.pem 
root@kovan:/etc/ssl/certs# for file in *.pem; do ln -s $file `openssl x509 -hash -noout -in $file`.0; done
root@kovan:/etc/ssl/certs# cd ~
```

#### Install git
```Shell
root@kovan:~# opkg install http://netv.bunnie-bar.com/build/kovan-debug/LATEST/armv5te/git_1.7.7-r2_armv5te.ipk
root@kovan:~# git config --global http.sslcainfo /etc/ssl/certs/cacert.pem
```

#### Install lighttpd

```Shell
root@kovan:~# opkg install http://netv.bunnie-bar.com/build/kovan-debug/LATEST/armv5te/libpcre0_8.21-r0_armv5te.ipk
root@kovan:~# opkg install http://netv.bunnie-bar.com/build/kovan-debug/LATEST/armv5te/lighttpd-module-indexfile_1.4.30-r2_armv5te.ipk
root@kovan:~# opkg install http://netv.bunnie-bar.com/build/kovan-debug/LATEST/armv5te/lighttpd-module-access_1.4.30-r2_armv5te.ipk
root@kovan:~# opkg install http://netv.bunnie-bar.com/build/kovan-debug/LATEST/armv5te/lighttpd-module-dirlisting_1.4.30-r2_armv5te.ipk
root@kovan:~# opkg install http://netv.bunnie-bar.com/build/kovan-debug/LATEST/armv5te/lighttpd-module-accesslog_1.4.30-r2_armv5te.ipk
root@kovan:~# opkg install http://netv.bunnie-bar.com/build/kovan-debug/LATEST/armv5te/lighttpd-module-staticfile_1.4.30-r2_armv5te.ipk
root@kovan:~# opkg install http://netv.bunnie-bar.com/build/kovan-debug/LATEST/armv5te/lighttpd-module-fastcgi_1.4.30-r2_armv5te.ipk
root@kovan:~# opkg install http://netv.bunnie-bar.com/build/kovan-debug/LATEST/armv5te/lighttpd-module-rewrite_1.4.30-r2_armv5te.ipk
root@kovan:~# opkg install http://netv.bunnie-bar.com/build/kovan-debug/LATEST/armv5te/lighttpd_1.4.30-r2_armv5te.ipk
```

### 1.3 Prepare the development environment

#### Clone the project
```Shell
root@kovan:~# git clone https://github.com/kipr/kisswebide.git
```

Patch the config files, the third-party libraries and link KISS Web IDE into the system
```Shell
root@kovan:~# ln -s ~/kisswebide/app /www/pages/kisswebide

```

#### Restart lighttpd
```Shell
root@kovan:~# ln -s ~/kisswebide/INSTALL/libs /www/pages/libs
```

