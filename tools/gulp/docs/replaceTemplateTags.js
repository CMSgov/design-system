/**
 * Replace template tags with string values
 * @param {String} str - String with template tags to be replaced
 * @param {String} rootPath
 * @return {String}
 */
function replaceTemplateTags(str, rootPath) {
  if (rootPath) {
    str = str.replace(/{{root}}/g, `/${rootPath}`);
  } else {
    str = str.replace(/{{root}}/g, '');
  }

  return str;
}

module.exports = replaceTemplateTags;
