'use strict';

const { author } = require('./package.json');
const blue = require('ansi-blue');
const exitHook = require('exit-hook');
const open = require('open');
const Select = require('./prompt-select');

const config = { pointer: blue('❯') };
const choices = new Select.Choices([{
  name: 'Github',
  url: author.url
}, {
  name: 'Contact',
  url: `mailto:${author.email}`
}, {
  name: 'Public key',
  url: author.pubkey
}, {
  name: 'Quit',
  action: () => process.exit()
}], config);

const g = `⌐${blue('■')}-${blue('■')}`;
console.log(`
  (${g})

  Hey, I'm
  ${blue('Dario Vladović')} (also known as @vladimyr)

  (${g})        I'm a developer who enjoys writing javascript,
  ( •_•)>${g}   breaks and builds stuff for fun & profit.
`);

const select = new Select({ choices });
select.on('select', onSelect);
exitHook(() => select.end());
select.ask();

function onSelect(choice) {
  if (choice.url) return open(choice.url);
  return choice.action && choice.action(choice, select);
}
