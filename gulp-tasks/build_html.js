const {src, dest} = require('gulp');
const htmlmin = require('gulp-htmlmin');

module.exports = function build_html() {
    return src('index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('build'))
}