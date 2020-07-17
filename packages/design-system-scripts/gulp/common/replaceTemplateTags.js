/**
 * Replace template tags with string values
 */
function replaceTemplateTags(str, options) {
  // KSS processes the markdown in documentation content before we can replace the tags
  // So unfortunately we need to match for the encoded version of the template tags
  // When KSS is removed we can update the regex here
  if (options.rootPath) {
    str = str.replace(/{{root}}|%7B%7Broot%7D%7D/g, `/${options.rootPath}`);
  } else {
    str = str.replace(/{{root}}|%7B%7Broot%7D%7D/g, '');
  }

  if (options.npmPackage) {
    str = str.replace(/{{npm}}|%7B%7Bnpm%7D%7D/g, `${options.npmPackage}`);
  } else {
    str = str.replace(/{{npm}}|%7B%7Bnpm%7D%7D/g, '');
  }

  if (options.githubUrl) {
    str = str.replace(/{{github}}|%7B%7Bgithub%7D%7D/g, `${options.githubUrl}`);
  } else {
    str = str.replace(/{{github}}|%7B%7Bgithub%7D%7D/g, '');
  }

  if (options.name) {
    str = str.replace(/{{name}}|%7B%7Bname%7D%7D/g, `${options.name}`);
  } else {
    str = str.replace(/{{name}}|%7B%7Bname%7D%7D/g, '');
  }

  return str;
}

module.exports = replaceTemplateTags;
