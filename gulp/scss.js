const { src, dest } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')

module.exports = function scss() {
	return src([
		'src/scss/style.scss',
		'src/scss/box.scss',
		'src/scss/dashboard.scss',
		'src/scss/sweetalert-custom.scss',
	])
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(
			autoprefixer({
				cascade: false,
				//overrideBrowserslist: ['last 8 versions'],
			})
		)
		.pipe(concat('style.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('build/css'))
}
