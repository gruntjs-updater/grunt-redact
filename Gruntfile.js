'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        'test/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      jasmine_node: {
        files: ['tasks/**/*.js', 'test/**/*.js'],
        tasks: ['test'],
        options: {
          livereload: true
        }
      }
    },

    jasmine_node: {
      projectRoot: "test/spec",
      forceExit: true
    },

    clean: {
      jasmine_node: ['test/spec/functional/tmp']
    },

    copy: {
      jasmine_node: {
        files: [
          {expand: true, cwd: 'test/spec/functional/src', src: ['*'], dest: 'test/spec/functional/tmp', filter: 'isFile'}
        ]
      }
    },

    redact: {
      jasmine_node: {
        options: {
          workingDirectory: 'test/spec/functional/tmp',
          toggleStatesFile: 'test/spec/functional/toggleStates.json'
        }
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('test', ['clean', 'copy', 'jshint', 'redact', 'jasmine_node']);

  grunt.registerTask('default', ['test']);

};
