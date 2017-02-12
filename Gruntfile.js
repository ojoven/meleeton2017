/** GRUNT FILE FOR DEV ENVIRONMENT **/
// use it as > grunt --gruntfile Gruntfile_dev.js
module.exports = function (grunt) {

	require( 'jit-grunt' )(grunt);

	grunt.initConfig({
		concat: {
			dist: {
				src: [
					'js/src/creative.js',
					'js/src/app.js'
				],
				dest: 'js/app.min.js'
			}
		},
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					"css/style.css": "less/style.less" // destination file and source file
				}
			}
		},
		watch: {
			files: ['js/src/**/*.js', 'less/**/*.less'],
			tasks: ['concat', 'less'],
			options: {
				nospawn: true
			}
		}
	});

	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	grunt.registerTask( 'default', ['concat', 'less', 'watch'] );

};