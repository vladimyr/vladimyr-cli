'use strict';

const isNpx = process.env.npm_config_prefix.includes('npx');
const isTravis = process.env.TRAVIS === 'true';

if (isTravis || isNpx) process.exit();

const { name } = require('./package.json');
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
