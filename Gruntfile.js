module.exports = function(grunt) {
  // Auto-require all grunt dependencies
  require('matchdep')
    .filterAll(['grunt-*', 'gruntify-*'])
    .forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    copy: {
      fonts: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: 'fonts/*',
            dest: 'dist/',
            filter: 'isFile'
          }
        ]
      }
    },
    eslint: {
      src: {
        files: [{
          expand: true,
          cwd: 'src/scripts',
          src: ['**/*.js', '**/*.jsx']
        }]
      }
    },
    less: {
      src: {
        options: {
          paths: ['src/styles']
        },
        files: [{
          expand: true,
          cwd: 'src/styles',
          src: ['all.less', 'components/*.less'], // TODO(sawyer): Exclude utils instead
          dest: 'dist/styles',
          ext: '.css'
        }]
      }
    },
    postcss: {
      options: {
        processors: [
          require('postcss-import')(), // inline imports
          require('autoprefixer')({browsers: '> 5% in US, last 2 versions'}),
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'dist/styles/**/*.css'
      }
    },
    stylelint: {
      src: ['src/styles/**/*.less'],
      options: {
        reportNeedlessDisables: true,
        syntax: 'less'
      }
    },
    watch: {
      scripts: {
        files: ['src/scripts/**/*.js', 'src/scripts/**/*.jsx'],
        tasks: ['eslint'],
      },
      styles: {
        files: ['src/styles/**/*.less'],
        tasks: ['stylelint', 'less', 'postcss'],
      }
    },
  });

  grunt.registerTask('build', ['stylelint', 'less', 'postcss', 'copy']);
};