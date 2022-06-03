const Frames = {
	async draw(target, id) {
		$("<iframe>", {
			sandbox: "",
			src: target,
			id: `frame${randint(100_000)}`,
			frameBorder: 0,
			width: 1,
			height: 1
		}).appendTo(frameDiv)
	}
	clear() {
		const a = frameDiv.element.children;
		while (frameDiv.element.children.length) {
			for (let i of a) {
				a[i].remove()
			}
		}
	}
}