const { watch, parallel } = require('gulp')

module.exports = function watching() {
	watch('src/*.html', parallel('html'))
	watch('src/scss/*.scss', parallel('scss'))
	watch(['src/ts/*.ts', 'src/sw.js'], parallel('build_js'))
	watch('src/manifest.json', parallel('minify_json'))
	watch(
		['src/sounds/*', 'src/robots.txt', 'src/favicon.ico', 'src/img/*'],
		parallel('move')
	)
}
