import { themeColors as core } from './themes/core';
import { themeColors as hc } from './themes/medicare';
import { themeColors as mc } from './themes/healthcare';
const _ = require('lodash');

const all = _.union(_.values(core), _.values(mc), _.values(hc));

// total unique colors utilized across hc, mc, core
console.log(all.length);
