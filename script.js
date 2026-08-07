const menus = document.querySelectorAll(".mega-menu");
const overlay = document.querySelector(".overlay");

menus.forEach(menu => {
  menu.addEventListener("mouseenter", () => {
    overlay.classList.add("show");
  });

  menu.addEventListener("mouseleave", () => {
    overlay.classList.remove("show");
  });
});