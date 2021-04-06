module.exports = function (grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'public/css/style.css': 'sass/main.scss'
				}
			}
		},
		postcss: {
			options: {
				map: true,

				processors: [
					require('pixrem')(),
					require('autoprefixer')({ browsers: 'last 2 versions' }),
					require('cssnano')()
				]
			},
			dist: {
				src: 'public/css/style.css'
			}
		},
		uglify: {
			my_target: {
				files: {
					'public/js/main.min.js': ['public/js/*.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('prod', ['sass', 'postcss', 'uglify']);
};
