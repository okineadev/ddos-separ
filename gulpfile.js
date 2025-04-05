const gulp = require('gulp')
const requireDir = require('require-dir')
const tasks = requireDir('gulp')

exports.build_js = tasks.build_js
exports.scss = tasks.scss
exports.html = tasks.html
exports.minify_json = tasks.minify_json
exports.move = tasks.move
exports.watch = tasks.watch

exports.default = gulp.parallel(
	exports.build_js,
	exports.scss,
	exports.minify_json,
	exports.html,
	exports.move
)

exports.dev = gulp.parallel(exports.default, tasks.watch)
