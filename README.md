# HttpFileSharing

Goal: easily share files from my Mac over the Internet with my friends

Problem: OS X file sharing capabilities are too complex (SMB, AFP...)

Requirements:
- No firewall configuration
- Read-only
- Basic password protection independent from the computer accounts and permissions

Solution: a simple Node.js web server with basic HTTP access authentication

The day [http-server](https://github.com/indexzero/http-server) provides [basic access authentication](https://github.com/indexzero/http-server/issues/47), this project will be obsolete.

## How to use

```Shell
npm install
npm run clean
npm run build
node app.js -h
node app.js ~/Public -p 8080 --user login --pass password
sudo node app.js ~/Public -p 80 --user login --pass password
```
