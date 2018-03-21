const rewire = require('rewire');
const paddingModule = rewire('./padding');

const templateToString = (strings, ...values) =>
  strings.reduce((out, string, i) => out + string + (values[i] || ''), '');

paddingModule.__set__('css', templateToString);
const { padding } = paddingModule;

// console.log(templateToString`hey ${'you'} ${'guys'}`);

console.log(padding(1, 2));
