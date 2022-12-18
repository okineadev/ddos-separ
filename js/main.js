/*!
MIT License

Copyright (c) 2022 Yuriy Bogdan
<>
*/

/**
 * База данних **localStorage**
 *
 * Данні зберігаються в пам'яті пристрою, досить схоже на **Cookies**
 */
const Database = localStorage;

if (!Database.attacks) Database.attacks = 0;

const Device = {
    /**
     * Батарея пристрою
     *
     * @example Device.battery // BatteryManager {...}
     */
    battery: navigator.battery || navigator.getBattery(),

    /**
     * Данні про підключення до **Інтернету**
     *
     * @example Device.connection // NetworkInformation {...}
     */
    connection: navigator.connection,

    /**
     * Статус мережі
     *
     * @example Device.onLine // true
     */
    onLine: navigator.onLine,

    /**
     * _**Конкуренція**_ (кількість ядер в процесорі)
     *
     * @example Device.concurrency // 8
     */
    concurrency: navigator.hardwareConcurrency,

    /**
     * Агент користувача
     *
     * @example Device.userAgent // 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 OPR/93.0.0.0'
     */
    userAgent: navigator.userAgent,

    /**
     * Чи являється пристрій телефоном
     *
     * @example Device.isPhone // false
     */
    get isPhone() {
        return /Android|IOS/.test(this.userAgent);
    },

    /**
     * Продуктивність пристрою
     *
     * @example Device.performance // Performance {...}
     */
    performance: performance,
};

/**
 * Звукові ефекти **(SFX)**
 *
 * - click
 *
 * @example Sounds.click.play() // [Звук]
 */
const Sounds = {
    click: new Audio('sounds/click.mp3'),
};

$(async () => {
    /*
    Кхм. Зарплата прийшла?
    Тоді можеш задонатити на ЗСУ прямо зараз - <https://uahelp.monobank.ua>

    Дякую!
    */

    Doser = new Doser();

    $('#button').click(/**Старт атаки*/ () => Doser.go());

    $('#attacks-section').click(
        /** Загальна кількість атак*/
        () =>
            swal(
                'Атаки',
                `Взагалом атаковано: <b>${Database.attacks}</b>`,
                'info'
            )
    );

    // Якщо на сайт заходять з інтернету
    if (window.location.protocol != 'file:') {
        if (navigator.onLine) {
            // Якщо заслабкий інтернет
            if (
                !['3g', '4g', '5g'].includes(navigator.connection.effectiveType)
            ) {
                swal(
                    'Зауваження',
                    'У вас заслабкий інтернет!\nДля ефективної атаки - підключіться до WI-FI',
                    'warning'
                );
            }
        } else swal('Помилка', 'Немає підключення до інтернету!', 'error');
    }

    $(window).on({
        /**
         * Гарячі клавіші
         * @param {Event} e Подія
         */
        keyup(e) {
            switch (e.keyCode) {
                case 19 || 35 /* Pause | end */:
                    Doser.stop();
                    break;

                case 115 /* F4 */:
                    Doser.go();
                    break;
            }
        },
    });

    // Фішечки

    //
    const battery = await navigator.getBattery();

    battery.onlevelchange = function () {
        if (!this.charging) {
            const level = this.level * 100;

            switch (level) {
                case 15:
                    swal(
                        'Увага!',
                        'У вас сідає батарея (залишилось 15%)',
                        'warning'
                    );
                    break;

                case 10:
                    swal(
                        'Увага!',
                        'Критично низький заряд батареї, атаку буде вимкнено\n\
                        Просимо поставити телефон на зарядку',

                        'warning'
                    ).then(() => Doser.stop());
                    break;
            }
        }
    };

    const params = new URLSearchParams(location.search);

    /*
    Читаємо URL-Параметри
    Приклад: https://bogdandevua.github.io/simple-ddos?quickstart
    */
    params.get('quickstart') && Doser.start();

    console.log(
        '%cЯкщо ти розробник - можеш допомогти проекту\nhttps://github.com/BogdanDevUA/simple-ddos',
        'font-size:20px;font-family:"Comic Sans MS"'
    );
});
// Слава Україні!
