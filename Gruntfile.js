module.exports = function(grunt) {
	'use strict';


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> Filament Group;' +
			' Licensed <%= pkg.license %> */\n',
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			js: {
				src: [
					'<%= banner %>',
					'src/X-rayHTML.js'
				],
				dest: 'dist/<%= pkg.name %>.js'
			},
			"iframe-js": {
				src: [
					'<%= banner %>',
					'src/X-rayHTML-iframe.js'
				],
				dest: 'dist/<%= pkg.name %>-iframe.js'
			},
			css: {
				src: [
					'<%= banner %>',
					'src/X-rayHTML.css'
				],
				dest: 'dist/<%= pkg.name %>.css'
			}
		},
		watch: {
			files: 'src/**/*',
			tasks: 'default'
		},
		jshint: {
			src: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: ['src/*.js']
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Default task.
	grunt.registerTask('default', ['jshint', 'concat']);
};
