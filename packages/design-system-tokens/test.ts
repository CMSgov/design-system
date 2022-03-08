import { flatten } from './src/lib/utility';

const someObject = {
  colors: {
    red: 'rose',
    blue: 'cerulean',
    transparent: {
      black: '#00000088',
      white: '#FFFFFF88',
    },
  },
  heights: {
    tall: '4vh',
    short: '0.5vh',
  },
};

const result = flatten(someObject, '--');
console.log(result);
