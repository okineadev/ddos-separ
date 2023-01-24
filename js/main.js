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
	Panel = new Panel();
	Sword = new Sword();
	Doser = new Doser();

	Panel.button.click(
		/**Старт атаки*/ () => {
			Sounds.click.play();
			Doser.run();
		}
	);

	$('#attacks-section').click(
		/** Загальна кількість атак*/
		() =>
			Swal.fire(
				'Атаки',
				`Взагалом атаковано: ${Database.attacks}`,
				'info'
			)
	);

	// Якщо на сайт заходять з інтернету
	if (window.location.protocol != 'file:') {
		if (Device.onLine) {
			// Якщо заслабкий інтернет
			if (!['3g', '4g', '5g'].includes(Device.connection.effectiveType)) {
				Swal.fire(
					'Зауваження',
					'У вас заслабкий інтернет!\nДля ефективної атаки - підключіться до WI-FI',
					'warning'
				);
			}
		} else Swal.fire('Помилка', 'Немає підключення до інтернету!', 'error');
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
					Swal.fire(
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
					Swal.fire(
						'Увага!',
						'Критично низький заряд батареї, атаку буде вимкнуто\n\
                        Просимо поставити телефон на зарядку',

						'warning'
					).then(() => Doser.stop());
					break;
			}
		}
	};

	console.log(
		'%cЯкщо ти розробник - можеш допомогти проекту\nhttps://github.com/BogdanDevUA/simple-ddos',

		'font-size: 16px;\
         font-family: "Comic Sans MS";'
	);
});

// Слава Україні!
