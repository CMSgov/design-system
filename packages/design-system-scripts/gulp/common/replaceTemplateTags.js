/**
 * Replace template tags with string values
 */
function replaceTemplateTags(str, options) {
  // KSS processes the markdown in documentation content before we can replace the tags
  // So unfortunately we need to match for the encoded version of the template tags
  // When KSS is removed we can update the regex here
  const tagRegex = (tag) => new RegExp(`${tag}|${encodeURI(tag)}`, 'g');
  return str
    .replace(tagRegex('{{root}}'), options.rootPath ? `/${options.rootPath}` : '')
    .replace(tagRegex('{{npm}}'), options.npmPackage ? `${options.npmPackage}` : '')
    .replace(tagRegex('{{github}}'), options.githubUrl ? `${options.githubUrl}` : '')
    .replace(tagRegex('{{name}}'), options.name ? `${options.name}` : '');
}

module.exports = replaceTemplateTags;
