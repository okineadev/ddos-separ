const { src, dest } = require('gulp')
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const ts = require('gulp-typescript')
const path = require('path')

const tsProject = ts.createProject('tsconfig.json')

module.exports = function build_js() {
	const tsResult = src([
		'src/ts/app.ts',
		'src/ts/utils.ts',
		'src/ts/worker.ts',
		'src/ts/main.ts',
	])
		.pipe(sourcemaps.init())
		.pipe(tsProject())
		.on('error', () => {})

	return tsResult.js
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('build/js'))
}
