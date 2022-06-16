const Frames = {
	async draw(target) {
		$("<iframe>", {
			src: target,
			id: `frame${randint(100_000)}`,
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