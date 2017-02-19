/** GRUNT FILE FOR DEV ENVIRONMENT **/
// use it as > grunt --gruntfile Gruntfile_dev.js
module.exports = function (grunt) {

	require( 'jit-grunt' )(grunt);

	grunt.initConfig({
		concat: {
			dist: {
				src: [
					'js/src/vendor/jquery.min.js',
					'js/src/vendor/bootstrap.min.js',
					'js/src/vendor/jquery.easing.min.js',
					'js/src/vendor/scrollreveal.min.js',
					'js/src/jquery.countdown.js',
					'js/src/app.js'
				],
				dest: 'js/app.min.js'
			}
		},
		uglify: {
			my_target : {
				options : {
					sourceMap : false,
					sourceMapName : 'sourceMap.map'
				},
				// We'll be using a common JS for all the sites
				files : {
					'js/app.min.js' : [
						'js/app.min.js'
					]
				}
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
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	grunt.registerTask( 'default', ['concat', 'less', 'watch'] );
	grunt.registerTask( 'deploy', ['concat', 'uglify','less', 'watch'] );

};