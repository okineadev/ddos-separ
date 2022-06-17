// Завантаження цілей
async function getTarget() {
	
	// Створення сповіщення про завантаження цілей
	(l=>{if (l[0]) l.remove()})($("#load"))

	$("<p>", {id:"load"}).text("Завантажуємо цілі...").appendTo(box);

	// Завантаження цілей
    let targets = await fetch(targetSource)
    .catch(e => {
    	$("#load").text("Помилка завантаження!");
    	alert("Ой!", "Помилка!", "Перевірте підключення до інтернету!", `Текст помилки: ${e}`);
    });
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