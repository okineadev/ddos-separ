const { src, dest } = require('gulp')
const htmlmin = require('gulp-htmlmin')

module.exports = function html() {
	return src('src/index.html')
		.pipe(
			htmlmin({
				collapseWhitespace: true,
				removeComments: true,
			})
		)
		.pipe(dest('build'))
}
