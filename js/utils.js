/*!
MIT License

Copyright (c) 2022-2023 Yuriy Bogdan
*/

const targetSource = 'https://raw.githubusercontent.com/xzyallzjx-231/iouzjla-612/main/40.json'

/**
 * База данних **localStorage**
 *
 * Данні зберігаються в пам'яті пристрою, досить схоже на **Cookies**
 */
const Database = localStorage

/**
 * Пристрій
 * 
 * @type {Device}
 * @example Decice.cores // 8
 */
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
     * Кількість ядер в процесорі
     *
     * @example Device.cores // 8
     */
    cores: navigator.hardwareConcurrency,

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
    isPhone: navigator.userAgentData.mobile,

    /**
     * Продуктивність пристрою
     *
     * @example Device.performance // Performance {...}
     */
    performance: performance,

    toString() {
        return navigator.platform
    }
}

/**
 * Звукові ефекти **(SFX)**
 *
 * - click
 *
 * @example Sounds.click.play() // [Звук]
 */
const Sounds = {
    click: new Audio('sounds/click.mp3'),
}

/** Керування панеллю **(main > .panel)** */
class Panel {

    /** Ініціалізація */
    constructor() {
        this.button = $("#button")
    }

    /**
     * Змінити текст кнопки
     * 
     * @param {ButtonText} text - Текст кнопки
     */
    buttonText(text) {
        this.button.text(text)
    }

    /** 
     * Показати ціль, яку ми атакуємо
     * 
     * @param {Target} target - Ціль
     */
    showCurrentTarget(target) {
        $(".target-page").text(target.page)
        $(".target-method").text(target.method)
    }

    /** Оновити лічильник атак */
    increaseAttacksCounter() {
        // Збереження кількості всіх атак в сховищі
        Database.attacks++

        const previousAttacks = parseInt(
            $("#attacks").text()
        )

        $("#attacks").text(previousAttacks + 1)
    }
}