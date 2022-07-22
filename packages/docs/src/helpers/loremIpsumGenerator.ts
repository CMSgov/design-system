type LoremIpsumTextLength = 's' | 'm' | 'l';

const lorem = {
  s: 'We the People of the United States',
  m: 'We the People of the United States, in Order to form a more perfect Union',
  l: 'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.',
};

/**
 * generateLoremIpsum
 * @param {String} textLength - size of placeholder text to return
 * @return {String} placeholder text
 */

export const generateLoremIpsum = (textLength: LoremIpsumTextLength): string => {
  return lorem[textLength];
};

export default generateLoremIpsum;
