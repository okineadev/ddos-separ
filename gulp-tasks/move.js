const {src, dest} = require('gulp');

module.exports = function move() {
    src('sounds/*.mp3')
        .pipe(dest('build/sounds/'))

    src(['robots.txt', 'favicon.ico'])
        .pipe(dest('build/'))

	return src('img/*.png')
		.pipe(dest('build/img/'))
}