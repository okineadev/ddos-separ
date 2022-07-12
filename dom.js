(() => {
    let D = document;

    /**`document.querySelector`*/
    const sl = q => D.querySelector(q);
    /**`document.querySelectorAll`*/
    const sla = q => D.querySelectorAll(q);

    class Selector {
        /**
         * @param {function|string} s
         * @param {?object|string} d 
         */
        constructor(s, d) {
            if (s && (d || !d)) {

                // Якщо це функція-ініціалізатор документа
                if (s && !d && typeof s === 'function') {
                    D.addEventListener('DOMContentLoaded', s, {
                        once: true
                    })
                } else {
                    let e;
                    // Якщо селектор це стрічка
                    if (typeof s === 'string') {
                        const mt = s.match(/<(\w+)>/);

                        // Якщо я хочу створити елемент
                        if (mt) {
                            this.selector = mt[1];
                            e = D.createElement(mt[1]);
                            if (d && typeof d === 'object') {
                                for (let k in d)
                                    e.setAttribute(k, d[k])
                            }

                        } else {
                            // Якщо я хочу побачити всі елементи з селектора
                            if (d && d === 'all') {
                                e = sla(s)
                            } else if (!d)
                                e = sl(s)
                        }

                    } else if (s instanceof Document) {
                        e = D
                    } else if (typeof s === 'object') {
                        e = s
                    };

                    // Якщо все ок
                    if (e) {
                        this[0] = e;
                        /**
                         * Прикріпити до
                         * @param {Document|Element|Selector} e 
                         */
                        this.appendTo = e => {
                            if (e instanceof (Document || Element)) {
                                e.appendChild(this[0])
                            } else if (e instanceof Selector) {
                                e[0].appendChild(this[0])
                            }
                        };
                        /**
                         * Встановити текст
                         * @param {string} t **Текст**
                         */
                        this.text = t => {
                            if (!t) return this[0].textContent;

                            this[0].textContent = t;
                            return this
                        };

                        /**
                         * Задати стиль
                         * @param {object} c **Стиль**
                         */
                        this.css = s => {
                            for (let i in s) this[0].style.setProperty(i, s[i]);

                            return this
                        };

                        /**
                         * Видалити стиль
                         * @param {object} s **Стиль**
                         */
                        this.removeCss = s => {
                            for (let i in s) this[0].style.removeProperty(i, s[i]);

                            return this
                        };

                        /**
                         * Встановити внутрішній **HTML** код
                         * @param {string} c **Код**
                         */
                        this.innerHtml = c => {
                            this[0].innerHTML = c;
                            return this
                        };

                        /**
                         * Прослуховувач подій
                         * @param {string} e **Подія**
                         * @param {function} f **Функція**
                         * @param {?object} c **Конфіг**
                         */
                        this.on = (e, f, c) => this[0].addEventListener(e, f, c);

                        /**
                         * @param {function} f **Функція**
                         * @param {?object} c **Конфіг**
                         */
                        this.click = (f, с) => this.on('click', f, с);

                        /**
                         * Подвійний клік
                         * @param {function} f **Функція**
                         * @param {?object} c **Конфіг**
                         */
                        this.dblclick = (f, c) => this.on('dblclick', f, c);

                        /**Видалити елемент*/
                        this.remove = () => {
                            try {
                                this[0].remove()
                            } catch {}
                        }
                    }
                }
            }
        }
    };
    /**
     * @param {function|string} s
     * @param {?object|string} с
     */
    window.$ = (s, с) => new Selector(s, с)
})()