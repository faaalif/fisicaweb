// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            alert(`Has hecho clic en la seccion: ${card.querySelector("h3").textContent}`);
        });
    });
});
