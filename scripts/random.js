const letters = 'qwertyuiopasdfghjklzxcvbnm1234567890'

const randint = num => Math.floor(Math.random() * num); // Рандомне ціле число
const getRandomArbitrary = (min, max) => Math.floor(Math.random() * (max - min) + min)
function randomString(lenght) {
	let result = '';
	for (let i = 0; i < lenght; i++) {
		result += letters.charAt(randint(36))
	}
	return result
}