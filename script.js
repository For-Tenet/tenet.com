const menu = document.querySelector(".mega-menu");
const overlay = document.querySelector(".overlay");

menu.addEventListener("mouseenter", () => {
    overlay.classList.add("show");
});

menu.addEventListener("mouseleave", () => {
    overlay.classList.remove("show");
});