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
			main: {
				options: {
					mangle: false
				},
				files: {
					'public/js/addIngredient.min.js': 'public/js/addIngredient.js',
					'public/js/selectNavItem.min.js': 'public/js/selectNavItem.js'
				}
			}
		},
		watch: {
			scripts: {
				files: ['sass/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('prod', ['sass', 'postcss', 'uglify']);
	grunt.registerTask('dev', ['watch']);
};
