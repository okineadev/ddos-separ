const letters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'+'123456789'.repeat(2);

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
 * Рандомна стрічка
 * @param {Number} lenght 
 */
function randomString(lenght) {
	let result='';
	for (let i=0; i < lenght; i++)result+=letters.charAt(randint(70));return result
}