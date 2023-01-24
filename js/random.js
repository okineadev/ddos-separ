/*!
MIT License

Copyright (c) 2022-2023 Yuriy Bogdan
*/

/**
 * Рандомне число від 0 до n
 *
 * @example getRandomInt(50) // 27
 * @param {number} num - До
 * @returns {number} Рандомне число
 */
const getRandomInt = (num) => Math.floor(Math.random() * num); // Рандомне ціле число

/**
 * Рандомний елемент з массиву
 *
 * @example randomChoice(['foo', 'bar', 'zoo']) // 'bar'
 * @example randomChoice('fooBarZoo') // 'o'
 * @param {array | string} array - Массив
 * @returns Рандомний елемент з массиву
 */
const randomChoice = (array) => array[getRandomInt(array.length)];
