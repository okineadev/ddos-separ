/**
 * Додає класс `active` до елементу 
 * @param {Element} e **Елемент**
 */
const toggleActive = e => e.classList.toggle("active");

/**
 * Показує сповіщення користувачу
 * @param {string} header **Заголовок**
 * @param {string} text **Текст**
 */
function alert(header, ...text) {
    clearModal();
    $("modal-header #header").text(header);
    let modalText = $("modal-body #text");

    for (let t of text) {
        $("<p>").innerHtml(t).appendTo(modalText)
    };

    modal.style.display = "block"
};

/**
 * Видалення сповіщення
 */
const clearModal = () => $("#header, #text p", "all")[0].forEach(e => e.textContent='');

let slideIndex = 1;
showSlides(slideIndex);

const plusSlides = n => showSlides(slideIndex += n);
const currentSlide = n => showSlides(slideIndex = n);

function showSlides(n) {
    let slides = $("my-slide", "all")[0];
    let dots = $(".dot", "all")[0];

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    let i;
    for (i of slides) i.style.display = "none";
    for (i of dots) i.className = i.className.replace(" active", "");

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active"
};

/**
 * Розгортання "аккордеону"
 * @param {Element} e **Елемент**
 */
function showAccordeon(e) {
    let content = e.getElementsByClassName("content")[0];
    toggleActive(e);
    if (content.style.maxHeight) { 
        content.style.maxHeight = null
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        setTimeout(() => $(".accordeon .content h3")[0].scrollIntoView(
                {behavior:'smooth', block:'center'}
            ),
        200)
    }
};

/**
 * Підсвічування елементу
 * @param {Element} e **Елемент**
 */
function highlight(e) {
    let t = {};
    const pxls = "2px 2px 2px";

    let data = {};

    // Варіанти тіней
    const bs = {"box-shadow": `${pxls} #a3a3a3`};
    const ts = {"text-shadow": `${pxls} #707070`};

    // Якщо в елемента є датасет
    if (e.dataset) {
        // І якщо в датасеті є властивість `текст`
        if (e.dataset.text) {
            // То це означає, що цей елемент - це текст
            // І для нього треба властивість `text-shadow`
            data = ts
        } else if (e.dataset.selector) {
            // Якщо зазначено, що треба підсвічувати інший елемент
            data = bs;
            e = $(e.dataset.selector)[0]
        }
    } else {
        data = bs
    };
    
    $(e).css(data);
    setTimeout(() => $(e).removeCss(data), 1500)
};

/**
 * Help Ukraine win widget
 * 
 * Віджет "Допомогти Україні"
 * 
 * За допомогою цього віджета, можна [**задонатити на ЗСУ**](https://uahelp.monobank.ua), через монобанк
 */
const HUWWidget = {
    selector: $("#help-ukraine .wrapper")[0],
    /**
     * Розгорнути віджет
     */
    show() {
        (s=>s.style.maxHeight ? HUWWidget.hide() : s.style.maxHeight = s.scrollHeight + "px")
        (this.selector)
    },

    /**
     * Згорнути віджет
     */
    hide() {this.selector.style.maxHeight=null}
}