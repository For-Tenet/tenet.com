const menus = document.querySelectorAll(".mega-menu");
const overlay = document.querySelector(".overlay");

menus.forEach((menu) => {
  menu.addEventListener("mouseenter", () => {
    overlay.classList.add("show");
  });

  menu.addEventListener("mouseleave", () => {
    overlay.classList.remove("show");
  });
});

const track = document.querySelector(".solutions-track");
const originalCards = [...document.querySelectorAll(".solution-card")];
const dots = document.querySelectorAll(".solution-dot");

const nextButton = document.getElementById("nextSolution");
const prevButton = document.getElementById("prevSolution");

const totalCards = originalCards.length;

let currentIndex = totalCards;
let autoplayTimer;
let isMoving = false;

const firstClones = originalCards.map((card) => card.cloneNode(true));
const lastClones = originalCards.map((card) => card.cloneNode(true));

lastClones.reverse().forEach((card) => {
  track.prepend(card);
});

firstClones.forEach((card) => {
  track.appendChild(card);
});

const cards = [...track.querySelectorAll(".solution-card")];

function getCardWidth() {
  const cardWidth = cards[0].offsetWidth;
  const trackStyle = window.getComputedStyle(track);
  const gap = parseFloat(trackStyle.gap);
  return cardWidth + gap;
}

function moveCarousel(animate = true) {
  const cardWidth = getCardWidth();
  const viewport = document.querySelector(".solutions-viewport");
  const viewportWidth = viewport.offsetWidth;
  const cardWidthOnly = cards[0].offsetWidth;
  const sideSpace = (viewportWidth - cardWidthOnly) / 2;
  track.style.transition = animate
    ? "transform 0.65s cubic-bezier(.65, 0, .35, 1)"
    : "none";
  const offset = sideSpace - currentIndex * cardWidth;
  track.style.transform = `translateX(${offset}px)`;

  updateDots();
}

function updateDots() {
  let realIndex = currentIndex - totalCards;
  realIndex = (realIndex + totalCards) % totalCards;
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === realIndex);
  });
}

function nextSolution() {
  if (isMoving) return;
  isMoving = true;
  currentIndex++;

  moveCarousel(true);
  resetAutoplay();
}

function previousSolution() {
  if (isMoving) return;
  isMoving = true;
  currentIndex--;

  moveCarousel(true);
  resetAutoplay();
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
    moveCarousel(true);
    resetAutoplay();
  });
});

nextButton.addEventListener("click", nextSolution);

prevButton.addEventListener("click", previousSolution);

function startAutoplay() {
  autoplayTimer = setInterval(() => {
    if (!isMoving) {
      currentIndex++;
      moveCarousel(true);
    }
  }, 5000);
}

function resetAutoplay() {
  clearInterval(autoplayTimer);
  startAutoplay();
}

const carousel = document.querySelector(".solutions-carousel");

carousel.addEventListener("mouseenter", () => {
  clearInterval(autoplayTimer);
});

carousel.addEventListener("mouseleave", () => {
  startAutoplay();
});

window.addEventListener("resize", () => {
  moveCarousel(false);
});

moveCarousel(false);
startAutoplay();
