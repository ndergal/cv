module.exports = function(grunt) {

	grunt.initConfig({
		express: {
			options: {
				port: 9000,
				hostname: "0.0.0.0",
				bases: [__dirname],
				livereload: true
			}
		},
		watch: {
			all: {
				files:  "index.html",
				options: {
					spawn: false 
				}
			}
		},
		open: {
			all: {
				path: 'http://localhost:<% express.all.options.port%>'
			}
		}
	});

	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-open');

	grunt.registerTask('default');
	grunt.registerTask('server', [
		'express',
		'open',
		'express-keepalive'
	]);

};
