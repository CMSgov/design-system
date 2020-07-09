/**
 * Replace template tags with string values
 */
function replaceTemplateTags(str, options) {
  if (options.rootPath) {
    str = str.replace(/{{root}}/g, `/${options.rootPath}`);
  } else {
    str = str.replace(/{{root}}/g, '');
  }

  return str;
}

module.exports = replaceTemplateTags;
