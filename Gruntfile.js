module.exports = function(grunt) {
  // Auto-require all grunt dependencies
  require('matchdep')
    .filterAll(['grunt-*', 'gruntify-*'])
    .forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    less: {
      dist: {
        options: {
          paths: ['src/styles']
        },
        files: [{
          expand: true,
          cwd: 'src/styles',
          src: ['all.less', 'components/*.less'],
          dest: 'dist/styles',
          ext: '.css'
        }]
      }
    },
    postcss: {
      options: {
        processors: [
          require('postcss-import')(), // inline imports
          require('autoprefixer')({browsers: 'last 2 versions'}),
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'dist/styles/**/*.css'
      }
    },
    watch: {
      css: {
        files: [`src/**/*.less`],
        tasks: ['less', 'postcss'],
      }
    },
  });

  grunt.registerTask('build', ['less', 'postcss']);
};