/**
 * Завантажувач цілей
 * @returns {JSON} **Ціль**
 */
async function getTarget() {

	// Завантаження цілей
    let targets = await fetch(targetSource)
    .catch(() => {});
    if (targets instanceof Response) { // Якщо запит повернув результат
    	const data = await targets.json();

		targets = [];

		// Фільтрування цілей
		for (let i in data) {
		    if (['post', 'get'].includes(data[i].method)) {
		        targets.push(data[i])
		    }
		};
		$("#load").remove();
	   	
	    return targets[randint(targets.length)]; // Рандомна ціль
    };
}