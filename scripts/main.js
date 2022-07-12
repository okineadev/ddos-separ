/**Звідси будуть завантажуватись цілі */
const targetSource = 
'https://raw.githubusercontent.com/opengs/uashieldtargets/master/sites.json';

// DOM елементи
let frameDiv, attacks, targetField, methodField, btn, box, modal;

/**Заборона на заміну тексту елементу `span#attackCount`*/
let lockAttackCount = false;

/**База данних (`localStorage`)*/
const Database = window.localStorage;
window.Database = Database;

(d => !d.attacks ? d.attacks = 0 : 0)(Database);

$(() => {
    // Оголошення елементів
    frameDiv = $("#frames");
    attacks = $("#attacks");
    targetField = $("#target");
    methodField = $("#method");
    btn = $("#button-text");
    box = $("#box");
    modal = $('modal-box')[0];

    Doser = new Doser; // Ініціалізація воркера

    $("#button").click(/**Старт атаки*/() => !Doser.attack ? Doser.start() : Doser.stop());

    $("#attackCount").click(/**Загальна кількість атак*/() => {
        (a=>alert("Атаки", `Взагалом атаковано: ${a}`))(Database.attacks)
    });

    $("#ua").dblclick(/**Пасхалка)*/() => alert("Слава Україні!", "Героям Слава!"));

    // Плавний скролл до елемента
    // Так, поки що мабуть говнокод, але в майбутньому зроблю рефакторинг
    $("top-nav a:not(:last-child)", "all")[0]
    .forEach(i => i.onclick = e => {
        e = $(e.target.dataset.link)[0];
        e.scrollIntoView(
            {behavior:'smooth', block:'center'}
        );
        if (Array.from(e.classList).includes("highlight")) highlight(e)
    });

    $(".accordeon", "all")[0].forEach(e => $(e).click(() => showAccordeon(e)));

    $("#help-ukraine").click(() => HUWWidget.show());

    $("#close").click(() => {
        modal.style.display = "none";
        clearModal()
    });

    // Якщо на сайт заходять з інтернету
    if (window.location.protocol != 'file:') {
        // Якщо заслабкий інтернет
        if (
            !['3g', '4g', '5g'].includes(navigator.connection.effectiveType)
            ) {
            alert(
                "Зауваження",
                "У вас заслабкий інтернет!",
                "Для ефективної атаки - підключіться до WI-FI"
            )
        } /*Або якщо взагалі в користувача мобільник дерев'яний*/ 
        else if (!navigator.connection.downlink) {
            alert(
                "Зауваження",
                "Увімкніть інтернет або підключіться до WI-FI!"
            )
        }
    };

    $(window).click(e => {
        if (e.target === modal) {
            clearModal();
            modal.style.display = "none"
        } else if (!e.target.matches("#help-ukraine *")&&$("#help-ukraine .wrapper")[0].style.maxHeight) {
            HUWWidget.hide()
        }
    });

    window.onhashchange = () => 
        $(window.location.hash)[0].scrollIntoView({behavior: 'smooth', block: 'center'})
})

// Слава Україні!