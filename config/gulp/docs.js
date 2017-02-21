// TODO: https://github.com/palantir/blueprint/blob/master/gulp/docs.js
const dutil = require('./doc-util');
const kss = require('kss');

module.exports = (gulp) => {
  const unwrapData = (section) => section.data;

  const FLAG_REGEX = /<p>@([\w-]+)(?:\s(.+))?<\/p>/g;

  function processFlags(section) {
    if (typeof section.description === 'string') {
      section.description = section.description.replace(FLAG_REGEX, (_, flag, value) => {
        switch (flag) {
        case 'react-example':
          section.reactExample = value;
          break;
        default:
          break;
        }
        // remove flag from output
        return '';
      });
    }
    return section;
  }

  gulp.task('docs', (done) => {
    dutil.logMessage('kss', 'Generating documentation');

    var options = {
      css: '/dist/styles/all.css',
      placeholder: '[modifier]',
      title: 'Hcgov Design System'
    };

    return kss.traverse('src/styles/', options)
      .then(styleguide => {
        var pages = styleguide.sections()
          .map(section => section.data)
          .map(processFlags);

        console.log(pages);
      });
  });
};
