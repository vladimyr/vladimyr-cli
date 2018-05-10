#!/usr/bin/env node

'use strict';

const { exit } = require('process');
const blue = require('ansi-blue');
const opn = require('opn');
const Select = require('./prompt-select');

const atob = str => Buffer.from(str, 'base64').toString('binary');

const mail = 'ZC52bGFkaW15citkZXZAZ21haWwuY29t';
const choices = new Select.Choices([{
  name: 'Github',
  url: 'https://github.com/vladimyr'
}, {
  name: 'Contact',
  url: `mailto:${atob(mail)}`
}, {
  name: 'Public key',
  url: 'https://keybase.io/vladimyr/key.asc'
}, {
  name: 'Quit',
  action: (_, prompt) => prompt.end()
}]);

console.log(`
  (⌐■_■)

  Hey, I'm
  ${blue('Dario Vladović')} (also known as @vladimyr)

  (⌐■_■)
  ( •_•)>⌐■-■

  I'm developer who enjoys writing javascript,
  breaks and builds stuff for fun & profit.
`);

const select = new Select({ choices });
select.on('select', onSelect);
select.on('end', exit);
select.ask();

function onSelect(choice) {
  if (choice.url) return opn(choice.url);
  return choice.action && choice.action(choice, select);
}
