module.exports = function(grunt) {
  // Auto-require all grunt dependencies
  require('matchdep')
    .filterAll(['grunt-*', 'gruntify-*'])
    .forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    browserSync: { // Documentation server
      dev: {
        bsFiles: {
          src : ['docs/**/*.css', 'docs/**/*.html']
        },
        options: {
          server: {
            baseDir: "./docs"
          },
          notify: false,
          open: false,
          watchTask: true
        }
      }
    },
    copy: {
      docs: {
        // Copy the compiled files into the docs site so they can be
        // referenced using relative URLs
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: ['fonts/*', 'styles/all.css'],
            dest: 'docs/dist/',
            filter: 'isFile'
          }
        ]
      }
    },
    kss: { // Documentation generation
      options: {
        css: '/dist/styles/all.css',
        placeholder: '[modifier]',
        title: 'Hcgov Design System'
      },
      dist: {
        src: ['src/styles/'],
        dest: 'docs'
      }
    },
    watch: { // Run corresponding tasks when certain files change
      docs: {
        files: ['dist/styles/**/*.css'],
        tasks: ['build:docs'],
      }
    },
  });

  // Grouped tasks
  grunt.registerTask('lint', ['eslint', 'stylelint']);
  grunt.registerTask('build:docs', ['copy:docs', 'kss']);

  // Executable tasks
  grunt.registerTask('watch', ['browserSync', 'copy:uswds', 'watch']);
  grunt.registerTask('build', ['lint', 'copy:fonts', 'build:css', 'build:docs']);
};