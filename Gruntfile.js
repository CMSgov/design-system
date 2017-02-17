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
      fonts: {
        // TODO(sawyer) Figure out a better way of managing these font files,
        // since it seems unecessary to have the same files in src/ and dist/
        files: [
          {
            expand: true,
            cwd: 'src',
            src: 'fonts/*',
            dest: 'dist/',
            filter: 'isFile'
          }
        ]
      },
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
    eslint: { // Lint JavaScript
      src: {
        files: [{
          expand: true,
          cwd: 'src/scripts',
          src: ['**/*.js', '**/*.jsx']
        }]
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
    postcss: { // Transform the preprocessed CSS
      options: {
        processors: [
          require('postcss-import')(), // inline imports
          require('autoprefixer')(), // add any necessary vender prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'dist/styles/**/*.css'
      }
    },
    sass: { // Process Sass -> CSS
      dist: {
        options: {
          outputStyle: 'expanded'
        },
        files: [{
          expand: true,
          cwd: `src`,
          src: ['**/*.scss'],
          dest: `dist`,
          ext: '.css',
          filter: filepath => !filepath.match(/\/(settings|tools)\//)
        }]
      }
    },
    stylelint: { // Lint CSS
      src: ['src/styles/**/*.scss'],
      options: {
        reportNeedlessDisables: true
      }
    },
    watch: { // Run corresponding tasks when certain files change
      docs: {
        files: ['dist/styles/**/*.css'],
        tasks: ['build:docs'],
      },
      scripts: {
        files: ['src/scripts/**/*.js', 'src/scripts/**/*.jsx'],
        tasks: ['eslint'],
      },
      styles: {
        files: ['src/styles/**/*.scss'],
        tasks: ['stylelint', 'build:css'],
      }
    },
  });

  // Grouped tasks
  grunt.registerTask('lint', ['eslint', 'stylelint']);
  grunt.registerTask('build:css', ['sass', 'postcss']);
  grunt.registerTask('build:docs', ['copy:docs', 'kss']);

  // Executable tasks
  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('build', ['lint', 'copy:fonts', 'build:css', 'build:docs']);
};