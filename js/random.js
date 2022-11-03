// @ts-check

/**
 * Рандомне число від 0 до n
 * 
 * @param {number} num До
 * @returns {number} Рандомне число
 */
const getRandomInt = num => Math.floor(Math.random() * num); // Рандомне ціле число

/**
 * Рандомний елемент з массиву
 * 
 * @param {array} array Массив
 * @returns Рандомний елемент з массиву
 */
const randomChoice = array => array[getRandomInt(array.length)]

/**
 * Рандомне число від n до n
 * 
 * @param {number} min Мінімальне число 
 * @param {number} max Максимальне число
 * @returns {number} Рандомне число
 */
const getRandomArbitrary = (min, max) => Math.floor(Math.random() * (max - min) + min);

/**
 * Довга стрічка з **x**
 * 
 * @param {number} len Довжина
 * @returns {Promise<string>} Флуд (xxxxxxxxx...)
 */
const getFloodString = async len => 'x'.repeat(len)


/**
 * Рандомний IP
 *
 * @returns {Promise<string>} Рандомна IP-Адреса (IPv4)
 */
async function getRandomIP() {
    return (
    `${getRandomInt(255)}.` +
    `${getRandomInt(255)}.` +
    `${getRandomInt(255)}.` +
    `${getRandomInt(255)}`
    )
};


/**
 * Рандомний агент користувача
 * 
 * @example
 * `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 YaBrowser/19.9.3.314 Safari/537.36`
 * @returns {Promise<string>} Рандомний User-Agent
 */
async function getRandomUseragent() {
    const platform = randomChoice([
        'Windows NT 10.0; Win64; x64',
        'Macintosh; Intel Mac OS X 10_14_6',
        'X11; Ubuntu; Linux x86_64; rv:69.0',
        'Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J'
    ])

    return `Mozilla/5.0 (${platform}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 YaBrowser/19.9.3.314 Safari/537.36`
}