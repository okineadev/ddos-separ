/**
 * Рандомне число від 0 до n
 * @param {number} num 
 * @returns Рандомне число
 */
const randint = num => Math.floor(Math.random() * num); // Рандомне ціле число

/**
 * Рандомне число від n до n
 * @param {number} min 
 * @param {number} max 
 * @returns Рандомне число
 */
const getRandomArbitrary = (min, max) => Math.floor(Math.random() * (max - min) + min);

/**
 * Довга стрічка
 * 
 * `\x07` - 
 * @param {Number} len
 * @returns Флуд (...)
 */
const floodString = len => '\x07'.repeat(len)