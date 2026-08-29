const menus = document.querySelectorAll(".mega-menu");
const overlay = document.querySelector(".overlay");

menus.forEach((menu) => {
  menu.addEventListener("mouseenter", () => {
    if (window.innerWidth > 576) {
      overlay.classList.add("show");
    }
  });

  menu.addEventListener("mouseleave", () => {
    if (window.innerWidth > 576) {
      overlay.classList.remove("show");
    }
  });

  const link = menu.querySelector(".nav-link");

  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 576) {
      e.preventDefault();
      menu.classList.toggle("active");
    }
  });
});

const track = document.querySelector(".solutions-track");
const viewport = document.querySelector(".solutions-viewport");
const carousel = document.querySelector(".solutions-carousel");
const originalCards = [...document.querySelectorAll(".solution-card")];
const dots = document.querySelectorAll(".solution-dot");
const nextButton = document.getElementById("nextSolution");
const prevButton = document.getElementById("prevSolution");

const totalCards = originalCards.length;
const autoplayDelay = 5000;
const transition = "transform 0.65s cubic-bezier(.65, 0, .35, 1)";

let currentIndex = totalCards;
let autoplayTimer;
let isMoving = false;

const firstClones = originalCards.map((card) => card.cloneNode(true));
const lastClones = originalCards.map((card) => card.cloneNode(true)).reverse();

lastClones.forEach((card) => track.prepend(card));
firstClones.forEach((card) => track.appendChild(card));

const cards = [...track.querySelectorAll(".solution-card")];

function getCardWidth() {
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  return cards[0].offsetWidth + gap;
}

function updateDots() {
  const realIndex = (currentIndex - totalCards + totalCards) % totalCards;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === realIndex);
  });
}

function moveCarousel(animate = true) {
  const cardWidth = getCardWidth();
  const sideSpace = (viewport.offsetWidth - cards[0].offsetWidth) / 2;

  track.style.transition = animate ? transition : "none";
  track.style.transform = `translateX(${sideSpace - currentIndex * cardWidth}px)`;

  updateDots();
}

function move(direction) {
  if (isMoving) return;

  isMoving = true;
  currentIndex += direction;

  moveCarousel();
  resetAutoplay();
}

function nextSolution() {
  move(1);
}

function previousSolution() {
  move(-1);
}

function startAutoplay() {
  clearInterval(autoplayTimer);

  autoplayTimer = setInterval(() => {
    if (!isMoving) {
      currentIndex++;
      moveCarousel();
    }
  }, autoplayDelay);
}

function resetAutoplay() {
  startAutoplay();
}

track.addEventListener("transitionend", () => {
  isMoving = false;

  if (currentIndex >= totalCards * 2) {
    currentIndex = totalCards;
    moveCarousel(false);
  }

  if (currentIndex < totalCards) {
    currentIndex = totalCards * 2 - 1;
    moveCarousel(false);
  }
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (isMoving) return;

    currentIndex = totalCards + index;
    moveCarousel();
    resetAutoplay();
  });
});

nextButton.addEventListener("click", nextSolution);
prevButton.addEventListener("click", previousSolution);

carousel.addEventListener("mouseenter", () => {
  clearInterval(autoplayTimer);
});

carousel.addEventListener("mouseleave", startAutoplay);

window.addEventListener("resize", () => {
  moveCarousel(false);
});

moveCarousel(false);
startAutoplay();

const serviceModal = document.getElementById("serviceModal");
const serviceModalClose = document.getElementById("serviceModalClose");
const serviceModalTitle = document.getElementById("serviceModalTitle");
const serviceModalText = document.getElementById("serviceModalText");

const serviceInfo = {
  dot: {
    title: "DOT Compliance",
    text: "Support with DOT requirements, compliance processes, and documentation to help keep your carrier operating safely and confidently.",
  },

  safety: {
    title: "Safety Management",
    text: "Practical safety management support designed to help identify risks, improve procedures, and maintain a strong safety culture.",
  },

  driver: {
    title: "Driver Qualification",
    text: "Support with driver qualification requirements and documentation to help ensure your drivers meet the necessary compliance standards.",
  },

  audits: {
    title: "Safety Audits",
    text: "Review of safety practices and documentation to identify potential compliance gaps and help your operation stay prepared.",
  },
};

document.addEventListener("click", (event) => {
  const trigger = event.target.closest(".service-trigger");

  if (!trigger) return;

  event.stopPropagation();

  const service = serviceInfo[trigger.dataset.service];

  if (!service) return;

  serviceModalTitle.textContent = service.title;
  serviceModalText.textContent = service.text;

  serviceModal.classList.add("active");
});

serviceModalClose.addEventListener("click", (event) => {
  event.stopPropagation();
  serviceModal.classList.remove("active");
});

serviceModal.addEventListener("click", (event) => {
  if (event.target === serviceModal) {
    serviceModal.classList.remove("active");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    serviceModal.classList.remove("active");
  }
});
