/// <reference path="../node_modules/DefinitelyTyped/node/node.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/express/express.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/morgan/morgan.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/compression/compression.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/basic-auth/basic-auth.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/minimist/minimist.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/serve-index/serve-index.d.ts" />
/// <reference path="../node_modules/DefinitelyTyped/serve-static/serve-static.d.ts" />

import * as express from 'express';
import * as logger from 'morgan';
import * as compression from 'compression';
import * as auth from 'basic-auth';
import * as minimist from 'minimist';
import * as serveIndex from 'serve-index';
import * as serveStatic from 'serve-static';

import HttpStatus from './HttpStatus';

interface Args extends minimist.ParsedArgs {
  h?: boolean;
  help?: boolean;
  p?: number;
  user?: string;
  pass?: string;
}

const argv: Args = minimist(process.argv.slice(2));

if (argv.h || argv.help) {
  console.log([
    'usage: HttpFileSharing [path] [options]',
    '',
    'options:',
    '  -p           Port to use',
    '  --user       User name for basic authentication',
    '  --pass       Password for basic authentication',
    '',
    '  -h --help    Print this list and exit.'
  ].join('\n'));
  process.exit();
}

const path = argv._[0];
const port = argv.p;
const username = argv.user;
const password = argv.pass;

const app = express();

app.use(compression()); // Compress all requests
app.use(logger('dev'));

app.use((req, res, next) => {
  const credentials = auth(req);
  if (credentials && credentials.name === username && credentials.pass === password) {
    next();
  }
  else {
    res.setHeader('WWW-Authenticate', 'Basic realm="Restricted Area"');
    res.status(HttpStatus.Unauthorized_401).end('Access denied');
  }
});

app.use(serveIndex(path, {'icons': true}));
app.use(serveStatic(path));

app.listen(port, () => {
  console.info(`Server listening on port ${port} in ${app.get('env')} mode`);
  console.info('Hit CTRL-C to stop the server');
});
