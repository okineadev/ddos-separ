const randint = num => Math.floor(Math.random() * num) // Рандомне ціле число

function getRandomArbitrary() {
	const max = 10_000_000;
	const min = 100_000;
	return Math.random() * (max - min) + min;
}

const getSalt = async target => /* Сіль з нашого Криму*/ `${target}?q=${getRandomArbitrary()}`