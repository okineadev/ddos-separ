const { src, dest } = require('gulp')

module.exports = function move() {
	src('src/sounds/*').pipe(dest('build/sounds'))

	src(['src/robots.txt', 'src/favicon.ico']).pipe(dest('build'))

	return src('src/img/*').pipe(dest('build/img'))
}
