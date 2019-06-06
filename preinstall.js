'use strict';

const kleur = require('kleur');
kleur.enabled = Boolean(process.stdout.isTTY);

const { name } = require('./package.json');
const fs = require('fs');
const path = require('path');

const { npm_config_prefix: prefix } = process.env;

const isGit = fs.existsSync(path.join(process.cwd(), '.git/config'));
const isNpx = prefix && prefix.includes('npx');

if (isGit || isNpx) process.exit();

const formatError = msg => `${kleur.white().inverse().bold().red(' Error ')} ${msg}`;

const msg = 'This cli is not supposed to be installed  (╯°□°)╯︵ ┻━┻';
console.error(` ${formatError(msg)}

  Use npx instead:
  $ npx ${name}
`);
process.exit(1);
