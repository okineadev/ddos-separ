const topNav = () => (d => d.active ? d.active = "" : d.active = "1")($('top-nav')[0].dataset);

let modal = $('modal-box')[0];
let close = $("#close");

function alert(header) {
    clearModal();
    $("modal-header #header").text(header)
    let modalText = $("modal-body #text")

    for (let t of Array.from(arguments).slice(1)) {
        $("<p>").innerHtml(t).appendTo(modalText)
    }

    modal.style.display = "block";
}

const clearModal = () => document.querySelectorAll("#header, #text p").forEach(e => e.textContent='')

close.click(() => {modal.style.display = "none"; clearModal()})

window.onclick = e => {
    if (e.target == modal) {
        clearModal();
        modal.style.display = "none";
    }
}


let slideIndex = 1;
showSlides(slideIndex);

const plusSlides = n => showSlides(slideIndex += n);
const currentSlide = n => showSlides(slideIndex = n);

function showSlides(n) {
    let i;
    let slides = $("my-slide", "all")[0];
    let dots = $(".dot", "all")[0];
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    for (let i of slides) i.style.display = "none";
    for (let i of dots) i.className = i.className.replace(" active", "");

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}