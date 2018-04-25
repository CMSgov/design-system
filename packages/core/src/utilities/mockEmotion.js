const mock = require('mock-require');

const templateToString = (strings, ...values) =>
  strings.reduce((out, string, i) => out + string + (values[i] || ''), '');

mock('emotion', {
  css: templateToString
});
