// Завантаження цілей
async function getTarget() {
	// Створення сповіщення про завантаження цілей
	$("#load").remove();
	$("<p>", {id:"load"}).text("Завантажуємо цілі...").appendTo(box);

    let targets = await fetch(targetSource)
    .catch((e) => {
    	$("#load").text("Помилка завантаження!");
    	alert(`Помилка!\nПеревірте підключення до інтернету!\nТекст помилки: ${e}`);
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

function setTarget(target) {
	if (target) {
		targetField.text(target.page);
	    methodField.text(target.method.toUpperCase());
	    return
	}
	return true
}