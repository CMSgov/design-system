/**
 * Replace template tags with string values
 */
function replaceTemplateTags(str, options) {
  if (options.rootPath) {
    str = str.replace(/{{root}}/g, `/${options.rootPath}`);
  } else {
    str = str.replace(/{{root}}/g, '');
  }

  if (options.npmPackage) {
    str = str.replace(/{{npm}}/g, `${options.npmPackage}`);
  } else {
    str = str.replace(/{{npm}}/g, '');
    console.log(str);
  }

  if (options.githubUrl) {
    str = str.replace(/{{github}}/g, `${options.githubUrl}`);
  } else {
    str = str.replace(/{{github}}/g, '');
    console.log(str);
  }

  if (options.name) {
    str = str.replace(/{{name}}/g, `${options.name}`);
  } else {
    str = str.replace(/{{name}}/g, '');
    console.log(str);
  }

  return str;
}

module.exports = replaceTemplateTags;
