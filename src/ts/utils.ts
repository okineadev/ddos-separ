/*!
MIT License

Copyright (c) 2022-2023 Yuriy Bogdan
*/

// ========== Polyfills ====================
if (!navigator?.getBattery && navigator?.battery) {
	navigator.getBattery = async () => navigator.battery;
}
// =========================================

// ======== Constants and objects ==========
const targetSource =
	'https://raw.githubusercontent.com/xzyallzjx-231/iouzjla-612/main/40.json';

/**
 * База данних **localStorage**
 *
 * Данні зберігаються в пам'яті пристрою, досить схоже на **Cookies**
 */
const Database = localStorage;

/**
 * Пристрій
 *
 * @example Decice.cores // 8
 */
const Device = {
	/**
	 * Батарея пристрою
	 *
	 * @example Device.battery // BatteryManager {...}
	 */
	battery: navigator.battery || navigator.getBattery(),

	/**
	 * Данні про підключення до **Інтернету**
	 *
	 * @example Device.connection // NetworkInformation {...}
	 */
	connection: navigator.connection,

	/**
	 * Статус мережі
	 *
	 * @example Device.onLine // true
	 */
	onLine: navigator.onLine,

	/**
	 * Кількість ядер в процесорі
	 *
	 * @example Device.cores // 8
	 */
	cores: navigator.hardwareConcurrency,

	/**
	 * Агент користувача
	 *
	 * @example Device.userAgent // 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 OPR/93.0.0.0'
	 */
	userAgent: navigator.userAgent,
	/**
	 * Чи являється пристрій телефоном
	 *
	 * @example Device.isPhone // false
	 */
	isPhone: navigator.userAgentData?.mobile,

	/**
	 * Продуктивність пристрою
	 *
	 * @example Device.performance // Performance {...}
	 */
	performance: performance,
};

/**
 * Звукові ефекти **(SFX)**
 *
 * - click
 *
 * @example Sounds.click.play() // [Звук]
 */
const Sounds = {
	click: new Audio('sounds/click.mp3'),
};

/** Керування панеллю **(main > .panel)** */
class Panel {
	[x: string]: any;

	constructor() {
		this.button = $('#button');
	}

	/**
	 * Змінити текст кнопки
	 *
	 * @param {ButtonText} text - Текст кнопки
	 */
	buttonText(text: ButtonText) {
		this.button.text(text);
	}

	/**
	 * Заблокувати кнопку старту для користувача
	 *
	 * Це робиться задля уникнення багу з нескінченними циклами (коли під час завантаження цілей користувач натискав кнопку - створювався другий цикл атаки, який неможливо спинити)
	 */
	lockButton() {
		this.button.attr('disabled', true);
	}

	/**
	 * Розблокувати кнопку старту для користувача
	 *
	 * Це робиться задля уникнення багу з нескінченними циклами (коли під час завантаження цілей користувач натискав кнопку - створювався другий цикл атаки, який неможливо спинити)
	 */
	unlockButton() {
		this.button.attr('disabled', false);
	}

	/**
	 * Показати ціль, яку ми зараз атакуємо
	 *
	 * @param {Target} target - Ціль
	 */
	showCurrentTarget(target: Target) {
		$('.target-page').text(target.page);
		$('.target-method').text(target.method);
	}

	/**
	 * Оновити запис кількості атак і показати їх кількість користувачу
	 */
	increaseAttacksCounter() {
		// Збереження кількості всіх атак в сховищі
		Database.attacks++;

		const previousAttacks = parseInt($('#attacks').text());

		$('#attacks').text(previousAttacks + 1);
	}
}

// =========================================

// ========== Random utils =================
/**
 * Рандомне число від 0 до n
 *
 * @example getRandomInt(50) // 27
 * @param {number} num - До
 * @returns {number} Рандомне число
 */
const getRandomInt = (num: number): number => Math.floor(Math.random() * num); // Рандомне ціле число

/**
 * Рандомний елемент з массиву
 *
 * @example randomChoice(['foo', 'bar', 'zoo']) // 'bar'
 * @example randomChoice('fooBarZoo') // 'o'
 * @param {array | string} array - Массив
 * @returns {*} Рандомний елемент з массиву
 */
const randomChoice = (array: Array<any> | string): any =>
	array[getRandomInt(array.length)];
// =========================================

// ========= Custom errors =================
class TargetsFetchingError extends Error {
	constructor() {
		super('Failed fetching targets');
		this.name = 'TargetsFetchingError';
	}
}

class EmptyTargetsList extends Error {
	constructor() {
		super('Targets list is empty');
		this.name = 'EmptyTargetsList';
	}
}

class TargetsEncodingError extends Error {
	constructor() {
		super('Targets encoding failed');
		this.name = 'TargetsEncodingError';
	}
}
// =========================================
