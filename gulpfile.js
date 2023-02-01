const gulp = require('gulp');
const requireDir = require('require-dir');
const tasks = requireDir('./gulp-tasks');

exports.build_js = tasks.build_js
exports.build_css = tasks.build_css
exports.build_html = tasks.build_html
exports.minify_json = tasks.minify_json
exports.move = tasks.move

exports.default = gulp.parallel(
  exports.build_js,
  exports.build_css,
  exports.minify_json,
  exports.move
)