/**
 * This task group generates our design system documentation using KSS. It
 * handles things like parsing our CSS comments and generating a JSON file
 * for us to render our documentation site.
 */
const dutil = require('./doc-util');
const kss = require('kss');
const processKssSection = require('./kss/processSection');

module.exports = (gulp) => {
  gulp.task('docs', (done) => {
    dutil.logMessage('kss', 'Generating documentation');

    var kssOptions = {
      css: '/dist/styles/all.css',
      placeholder: '[modifier]',
      title: 'Hcgov Design System'
    };

    return kss.traverse('src/styles/', kssOptions)
      .then(styleguide => {
        var pages = styleguide.sections()
          .map(processKssSection);

        console.log(pages);
      });
  });
};
