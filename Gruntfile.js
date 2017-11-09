module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= pkg.homepage %>) */',
        mangle: {
          reserved: ['jQuery', 'define', 'module', 'html2json']
        }
      },
      html2json: {
        files: {
          'dist/jquery.html2json.min.js': ['src/*.js']
        }
      }
    },
    jshint: {
      options: {
        globals: {
          jQuery: true
        }
      },
      files: ['src/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['jshint', 'uglify']);
};