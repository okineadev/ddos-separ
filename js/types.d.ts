/** Батарея */
declare interface BatteryManager {
    /**
     * Статус зарядки
     *
     * @example await navigator.getBattery().charging // true
     */
    readonly charging: boolean;

    /**
     * Час, що залишився до повної зарядки
     *
     * @example await navigator.getBattery().chargingTime // 120
     */
    readonly chargingTime: number;

    /**
     * Час, що залишився до повної розрядки
     *
     * @example await navigator.getBattery().dischargingTime // 120
     */
    readonly dischargingTime: number;

    /**
     * Рівень заряду батареї
     *
     * @example await navigator.getBattery().level * 100 // 87
     */
    readonly level: number;

    /**
     * Коли було підключено/відключено зарядний пристрій
     *
     * @example await navigator.getBattery().onchargingchange = function () {console.log(this)} // BatteryManager {...}
     */
    onchargingchange: null;

    /**
     * Коли змінився час до повної зарядки
     *
     * @example await navigator.getBattery().onchargingtimechange = function () {console.log(this)} // BatteryManager {...}
     */
    onchargingtimechange: null;

    /**
     * Коли змінився час до повної розрядки
     *
     * @example await navigator.getBattery().ondischargingtimechange = function () {console.log(this)} // BatteryManager {...}
     */
    ondischargingtimechange: null;

    /**
     * Коли змінився рівень заряду
     *
     * @example await navigator.getBattery().onlevelchange = function () {console.log(this)} // BatteryManager {...}
     */
    onlevelchange: null;
}

declare interface Navigator {
    /**
     * Отримати данні про батарею
     *
     * @example await navigator.getBattery() // BatteryManager {...}
     */
    getBattery(): readonly Promise<BatteryManager>;

    /**
     * Отримати данні про батарею
     *
     * @example navigator.battery // BatteryManager {...}
     */
    readonly battery: BatteryManager;
}

/** Ціль для атаки */
declare interface Target {
    /**
     * Сторінка для атаки
     *
     * @example `https://russia.ru`
     */
    readonly page: string;

    /** Метод для атаки */
    readonly method: "get" | "post" | "slowloris" | "udp_flood";
}

/** Пристрій */
declare interface Device {
    readonly battery: Promise<BatteryManager>;
    readonly connection: NetworkInformation;
    readonly onLine: boolean;
    readonly concurrency: number;
    readonly userAgent: string;
    get isPhone(): readonly boolean;
    readonly performance: Performance;
}

declare type ButtonText = "Старт!" | "Стоп"
