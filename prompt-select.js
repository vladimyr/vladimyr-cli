'use strict';

const blue = require('ansi-blue');
const List = require('prompt-list');

class Select extends List {
  end() {
    super.end();
    this.emit('end');
  }

  renderChoice(choices) {
    return function (line) {
      const selected = choices.get(choices.position);
      return this === selected ? blue(line) : line;
    };
  }

  renderHelp() {
    return '';
  }

  renderMessage() {
    return '';
  }

  submitAnswer(key) {
    const selected = this.choices.getChoice(key);
    this.emit('select', selected);
  }
}

module.exports = Select;
