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
# Build and copy binaries from https://github.com/tkrotoff/HttpFileSharing
# to /usr/local/bin and /usr/local/lib/node_modules
npm install -g tkrotoff/HttpFileSharing

# Modify HttpFileSharing.plist with your parameters
vim /usr/local/lib/node_modules/HttpFileSharing/HttpFileSharing.plist

sudo cp /usr/local/lib/node_modules/HttpFileSharing/HttpFileSharing.plist /Library/LaunchDaemons

sudo launchctl unload -w /Library/LaunchDaemons/HttpFileSharing.plist
sudo launchctl load -w /Library/LaunchDaemons/HttpFileSharing.plist
```

## Debug

```Shell
npm install
npm run clean
npm run build
bin/HttpFileSharing ~/Public -p 8080 --user login --pass password
sudo bin/HttpFileSharing ~/Public -p 80 --user login --pass password
```
