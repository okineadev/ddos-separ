const { src, dest } = require('gulp')
const jsonmin = require('gulp-jsonmin')

module.exports = function minify_json() {
	return src('src/manifest.json').pipe(jsonmin()).pipe(dest('build'))
}
