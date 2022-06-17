const randint = num => Math.floor(Math.random() * num) // Рандомне ціле число

function getRandomArbitrary() {
	const max = 10_000_000;
	const min = 100_000;
	return Math.random() * (max - min) + min;
}