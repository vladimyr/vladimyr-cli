'use strict';

const { name } = require('./package.json');
const fs = require('fs');
const path = require('path');

const { npm_config_prefix: prefix } = process.env;

const isGit = fs.existsSync(path.join(process.cwd(), '.git/config'));
const isNpx = prefix && prefix.includes('npx');

if (isGit || isNpx) process.exit();

const wrap = (a, b, msg) => `\u001b[${a}m${msg}\u001b[${b}m`;
const bold = msg => wrap(1, 22, msg);
const bgRed = msg => wrap(41, 49, msg);
const white = msg => wrap(37, 39, msg);
const formatError = msg => `${bgRed(white(bold('Error')))} ${msg}`;

const msg = 'This cli is not supposed to be installed  (╯°□°)╯︵ ┻━┻';
console.error(` ${formatError(msg)}

  Use npx instead:
  $ npx ${name}
`);
process.exit(1);
