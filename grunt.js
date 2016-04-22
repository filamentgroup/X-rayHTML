/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= pkg.license %> */'
    },
    concat: {
      js: {
        src: [
          '<banner:meta.banner>',
          '<file_strip_banner:src/X-rayHTML.js>'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      },
      "iframe-js": {
        src: [
          '<banner:meta.banner>',
          '<file_strip_banner:src/X-rayHTML-iframe.js>'
        ],
        dest: 'dist/<%= pkg.name %>-iframe.js'
      },
      css: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/X-rayHTML.css>'],
        dest: 'dist/<%= pkg.name %>.css'
      }
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: 'src/**/*',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint concat');

};
