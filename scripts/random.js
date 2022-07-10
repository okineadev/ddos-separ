/**
 * Рандомне число від 0 до n
 * @param {String} num 
 */
const randint = num => Math.floor(Math.random() * num); // Рандомне ціле число

/**
 * Рандомне число від n до n
 * @param {Number} min 
 * @param {Number} max 
 */
const getRandomArbitrary = (min, max) => Math.floor(Math.random() * (max - min) + min);

/**
 * Довга стрічка
 * @param {Number} lenght 
 */
const floodString = len => '▒'.repeat(len)