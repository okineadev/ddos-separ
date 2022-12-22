// @filename: types.d.ts

/** Батарея */
declare interface BatteryManager {
    /**
     * Статус зарядки
     *
     * @example await navigator.getBattery().charging // true
     */
    charging: boolean;

    /**
     * Час, що залишився до повної зарядки
     *
     * @example await navigator.getBattery().chargingTime // 120
     */
    chargingTime: number;

    /**
     * Час, що залишився до повної розрядки
     *
     * @example await navigator.getBattery().dischargingTime // 120
     */
    dischargingTime: number;

    /**
     * Рівень заряду батареї
     *
     * @example await navigator.getBattery().level * 100 // 87
     */
    level: number;

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
    getBattery(): Promise<BatteryManager>;

    /**
     * Отримати данні про батарею
     *
     * @example navigator.battery // BatteryManager {...}
     */
    battery: BatteryManager;
}

/** Ціль для атаки */
declare interface Target {
    /**
     * Сторінка для атаки
     *
     * @example `https://russia.ru`
     */
    page: string;

    /** Метод для атаки */
    method: "GET" | "POST";
}
