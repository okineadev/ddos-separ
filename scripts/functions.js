// Alert modal box ===================================
function topNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

let modal = $('#modalBox').element;
let close = $("#close");

function alert(header='Повідомлення', text) {
    clearModal();
    $("#modal-header #header").text(header)
    let modalText = $("#modal-body #text")

    for (let p of text.split("||")) {
        $("<p>").text(p).appendTo(modalText)
    }

    modal.style.display = "block";
}

clearModal = () => document.querySelectorAll("#header, #text p").forEach(e => e.textContent='')

close.click(() => {modal.style.display = "none"; clearModal()})

window.onclick = e => {
    if (e.target == modal) {
        clearModal();
        modal.style.display = "none";
    }
}