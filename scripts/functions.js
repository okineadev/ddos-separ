/**
 * Додає класс **active** до елементу 
 * @param {Element} e **Елемент**
 */
const toggleActive = e => e.classList.toggle("active");

/**
 * Показує сповіщення користувачу
 * @param {String} header **Заголовок**
 * @param {String} text **Текст**
 */
function alert(header, ...text) {
    clearModal()
    $("modal-header #header").text(header)
    let modalText = $("modal-body #text")

    for (let t of text) {
        $("<p>").innerHtml(t).appendTo(modalText)
    }

    modal.style.display = "block";
}

// Видаляє сповіщення
const clearModal = () => $("#header, #text p", "all")[0].forEach(e => e.textContent='')

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
    dots[slideIndex-1].className += " active";
}

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
            200);
        }
}

/**
 * Підсвічування елементу
 * @param {Element} e **Елемент**
 */
function highlight(e) {
    let t = {};
    const pxls = "2px 2px 2px"

    let data = {}

    const bs = {"box-shadow": `${pxls} #a3a3a3`}
    const ts = {"text-shadow": `${pxls} #707070`}

    if (e.dataset) {
        if (e.dataset.text) {
            data = ts
        } else if (e.dataset.selector) {
            data = bs
            e = $(e.dataset.selector)[0]
        }
    } else {
        data = bs
    }
    
    $(e).css(data);
    setTimeout(() => $(e).removeCss(data), 1500)
}

const HUWWidget = {
    selector: $("#help-ukraine .wrapper")[0],
    show() {(s=>s.style.maxWidth?HUWWidget.hide():s.style.maxWidth=s.scrollWidth+"px")(HUWWidget.selector)},
    hide() {HUWWidget.selector.style.maxWidth=null}
}