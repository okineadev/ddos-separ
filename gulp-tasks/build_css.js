const {src, dest} = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

module.exports = function build_css() {
    return src([
            'css/style.css',
            'css/box.css',
            'css/dashboard.css',
            'css/sweetalert-custom.css'
        ])
		.pipe(cleanCSS())
        .pipe(concat('style.min.css'))
		.pipe(dest('build/css/'))
}