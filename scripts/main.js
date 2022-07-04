// Звідси будуть завантажуватись цілі
const targetSource = 
'https://raw.githubusercontent.com/opengs/uashieldtargets/master/sites.json';

let frameDiv, attacks, targetField, methodField, btn, box, modal;

let lockAttackCount = false;

const Database = window.localStorage;
window.Database = Database;

Database.attacks = 0;

$(() => {
    frameDiv = $("#frames");
    attacks = $("#attacks");

    // Відображення цілі та методу атаки
    targetField = $("#target");
    methodField = $("#method");

    // https://github.com/BogdanDevUA/simple-ddos/
    btn = $("#button-text");
    box = $("#box");

    modal = $('modal-box')[0];

    Doser = new Doser; // Ініціалізація воркера

    $("#button").click(() => !Doser.attack ? Doser.start() : Doser.stop());

    $("#attackCount").click(() => {
        // Загальна кількість атак

        const a = Database.attacks
        alert("Атаки", `Взагалом атаковано: ${!a?0:a}`)
    });

    $("#ua").dblclick(() => alert("Слава Україні!", "Героям Слава!"));

    $("top-nav a:not(:last-child)", "all")[0]
    .forEach(i=>i.onclick = e => {
        e = $(e.target.dataset.link)[0]
        e.scrollIntoView(
            {behavior:'smooth', block:'center'}
        );
        if (Array.from(e.classList).includes("highlight")) highlight(e);
    });

    $(".accordeon", "all")[0].forEach(e => $(e).click(() => showAccordeon(e)));

    $("#help-ukraine").click(HUWWidget.show);

    $("#close").click(() => {modal.style.display = "none"; clearModal()});

    $(window).click(e => {
        if (e.target == modal) {
            clearModal();
            modal.style.display = "none"
        } else if (!e.target.matches("#help-ukraine *")&&$("#help-ukraine .wrapper")[0].style.maxWidth) {
            HUWWidget.hide()
        }
    })
})

// Слава Україні!