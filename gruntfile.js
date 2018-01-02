module.exports = function(grunt) {
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'app/static/js/scripts.js',
                dest: 'static/js/scripts.min.js'
            }
        },
		less: {
			compile: {
				files: {
					'src/app/static/css/styles.css' : 'src/app/static/less/styles.less'
				}
			}
		},
        cssmin: {
            compress: {
                files: {
                    'src/public/css/styles.min.css': ['src/app/static/css/styles.css']
                }
            }
        },
		watch: {
            // scripts: {
            //     files: ['gruntfile.js','app/static/js/*.js'],
            //     tasks: ['uglify'],
            //     options: {
            //         debounceDelay: 250
            //     }
            // },
            less: {
                files: ['src/app/static/less/*.less', 'src/app/static/css/*.css'],
                tasks: ['less','cssmin'],
                options: {
                    debounceDelay: 250
                }
            }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['less']);
    grunt.loadNpmTasks('grunt-contrib-cssmin');
}