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

const solutionCards = document.querySelectorAll(".solution-card");
const solutionDots = document.querySelectorAll(".solution-dot");

const prevSolution = document.getElementById("prevSolution");
const nextSolution = document.getElementById("nextSolution");

let currentSolution = 0;
let solutionTimer;

function showSolution(index) {
  solutionCards.forEach((card) => {
    card.classList.remove("active");
  });

  solutionDots.forEach((dot) => {
    dot.classList.remove("active");
  });

  solutionCards[index].classList.add("active");
  solutionDots[index].classList.add("active");

  currentSolution = index;
}

function nextSlide() {
  let nextIndex = currentSolution + 1;

  if (nextIndex >= solutionCards.length) {
    nextIndex = 0;
  }

  showSolution(nextIndex);
  resetSolutionTimer();
}

function previousSlide() {
  let previousIndex = currentSolution - 1;

  if (previousIndex < 0) {
    previousIndex = solutionCards.length - 1;
  }

  showSolution(previousIndex);
  resetSolutionTimer();
}

function resetSolutionTimer() {
  clearInterval(solutionTimer);

  solutionTimer = setInterval(() => {
    let nextIndex = currentSolution + 1;

    if (nextIndex >= solutionCards.length) {
      nextIndex = 0;
    }

    showSolution(nextIndex);
  }, 5000);
}

nextSolution.addEventListener("click", nextSlide);

prevSolution.addEventListener("click", previousSlide);

solutionDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSolution(index);

    resetSolutionTimer();
  });
});

resetSolutionTimer();
