// Звідси будуть завантажуватись цілі
const targetSource = 'https://raw.githubusercontent.com/opengs/uashieldtargets/master/sites.json'

const saverInterval = 3000
const attackInterval = 200

// Функції для керування документом

const frameDiv = $("#frames")
const attacks = $("#attacks")

const add_count = () => attacks.text(parseInt(attacks.text()) + 1) // Кількість атак


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
	alert(`Взагалом атаковано: ${!a?0:a}`)
});

// Пасхалки)

$("#fixed-bugs").click(() => alert("Я справді пофіксив баги!"));

$("#uses").click(() => alert("Цей сайт був написаний 13 річним хакером на JS, HTML, CSS"));

$("#ua").dblclick(() => alert("Героям Слава!"));

// Слава Україні!