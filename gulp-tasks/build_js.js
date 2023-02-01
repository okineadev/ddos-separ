const {src, dest} = require('gulp');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

module.exports = function build_js() {
	src('sw.js')
		.pipe(uglify())
		.pipe(dest('build/'))

	return src('js/*.js')
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write('/'))
		.pipe(dest('build/js/'))
}