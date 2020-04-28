/**
 * Process template tags in KSS markup
 * @param {String} markup - HTML markup with any template tags
 * @param {Object} modifier - KSS modifier property
 * @return {String} Markup with all template tags replaced
 */
function processMarkup(markup, modifier) {
  const html = markup;
  modifier = modifier ? ` ${modifier.className}` : '';

  const lorem = {
    s: 'We the People of the United States',
    m: 'We the People of the United States, in Order to form a more perfect Union',
    l:
      'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.'
  };

  return html
    .replace(/\s?{{\s?modifier\s?}}/g, modifier)
    .replace(/\s?{{\s?lorem-s\s?}}/g, lorem.s)
    .replace(/\s?{{\s?lorem-m\s?}}/g, lorem.m)
    .replace(/\s?{{\s?lorem-l\s?}}/g, lorem.l);
}

export default processMarkup;
