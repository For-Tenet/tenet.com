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

let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.touches[0].clientX;
  },
  { passive: true },
);

carousel.addEventListener(
  "touchend",
  (event) => {
    touchEndX = event.changedTouches[0].clientX;

    const swipeDistance = touchEndX - touchStartX;
    const minimumSwipe = 50;

    if (swipeDistance < -minimumSwipe) {
      nextSolution();
    }

    if (swipeDistance > minimumSwipe) {
      previousSolution();
    }
  },
  { passive: true },
);

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
const serviceModalLabel = document.getElementById("serviceModalLabel");

const serviceInfo = {
  dot: {
    title: "DOT Compliance",
    category: "SAFETY & COMPLIANCE",
    text: "Support with DOT requirements, compliance processes, and documentation to help keep your carrier operating safely and confidently.",
  },

  safety: {
    title: "Safety Management",
    category: "SAFETY & COMPLIANCE",
    text: "Practical safety management support designed to help identify risks, improve procedures, and maintain a strong safety culture.",
  },

  driver: {
    title: "Driver Qualification",
    category: "SAFETY & COMPLIANCE",
    text: "Support with driver qualification requirements and documentation to help ensure your drivers meet the necessary compliance standards.",
  },

  audits: {
    title: "Safety Audits",
    category: "SAFETY & COMPLIANCE",
    text: "Review of safety practices and documentation to identify potential compliance gaps and help your operation stay prepared.",
  },

  eld: {
    title: "ELD Monitoring",
    category: "ELD & FLEET MANAGEMENT",
    text: "Stay on top of driver hours, electronic logs, and fleet activity with reliable ELD monitoring designed to improve compliance and visibility.",
  },

  gps: {
    title: "GPS Tracking",
    category: "ELD & FLEET MANAGEMENT",
    text: "Real-time vehicle location and fleet visibility to help you monitor movement, improve coordination, and maintain better control of your operation.",
  },

  fleet: {
    title: "Fleet Monitoring",
    category: "ELD & FLEET MANAGEMENT",
    text: "Comprehensive fleet monitoring designed to give you better visibility into vehicle activity, performance, and day-to-day operations.",
  },

  "driver-monitoring": {
    title: "Driver Monitoring",
    category: "ELD & FLEET MANAGEMENT",
    text: "Monitor driver activity and performance to help identify risks, improve accountability, and support safer fleet operations.",
  },

  "eld-dispatch": {
    title: "ELD Dispatch",
    category: "DISPATCH & OPERATIONS",
    text: "Efficient dispatch support designed to coordinate drivers, manage routes, and keep your fleet operations running smoothly.",
  },

  "load-coordination": {
    title: "Load Coordination",
    category: "DISPATCH & OPERATIONS",
    text: "Support with load planning and coordination to help connect available drivers with loads and keep your operation organized.",
  },

  "fleet-operations": {
    title: "Fleet Operations",
    category: "DISPATCH & OPERATIONS",
    text: "Operational support focused on improving fleet coordination, communication, and day-to-day efficiency.",
  },

  "driver-support": {
    title: "Driver Support",
    category: "DISPATCH & OPERATIONS",
    text: "Reliable support for drivers throughout their daily operations, helping resolve issues and maintain smooth communication.",
  },

  accounting: {
    title: "Accounting",
    category: "ACCOUNTING & BUSINESS",
    text: "Professional accounting support designed to help keep your financial records organized, accurate, and up to date.",
  },

  ifta: {
    title: "IFTA",
    category: "ACCOUNTING & BUSINESS",
    text: "Support with IFTA reporting and fuel tax documentation to help keep your operation organized and compliant.",
  },

  payroll: {
    title: "Payroll Support",
    category: "ACCOUNTING & BUSINESS",
    text: "Reliable payroll support to help organize driver and employee compensation while keeping payroll processes accurate and efficient.",
  },

  "financial-reporting": {
    title: "Financial Reporting",
    category: "ACCOUNTING & BUSINESS",
    text: "Clear financial reporting that helps you understand your business performance and make informed operational decisions.",
  },

  "mc-setup": {
    title: "New MC Setup",
    category: "CARRIER SETUP",
    text: "Guidance and support for setting up a new Motor Carrier authority and getting your carrier operation ready to begin business.",
  },

  "dot-registration": {
    title: "DOT Registration",
    category: "CARRIER SETUP",
    text: "Support with DOT registration requirements and documentation to help establish your carrier operation properly.",
  },

  "mc-reinstatement": {
    title: "MC Reinstatement",
    category: "CARRIER SETUP",
    text: "Assistance with the reinstatement process for inactive or revoked Motor Carrier authority.",
  },

  "carrier-support": {
    title: "Carrier Support",
    category: "CARRIER SETUP",
    text: "Ongoing support for carriers with compliance, operational, and administrative needs as your business grows.",
  },

  "commercial-insurance": {
    title: "Commercial Insurance",
    category: "INSURANCE",
    text: "Support in navigating commercial insurance needs and helping you understand coverage requirements for your transportation operation.",
  },

  "claims-support": {
    title: "Claims Support",
    category: "INSURANCE",
    text: "Assistance with claims-related processes and documentation to help you navigate incidents efficiently and stay organized.",
  },

  "business-consulting": {
    title: "Business Consulting",
    category: "INSURANCE",
    text: "Practical consulting focused on improving your transportation business, operations, and overall business strategy.",
  },

  "operational-guidance": {
    title: "Operational Guidance",
    category: "INSURANCE",
    text: "Hands-on guidance to help streamline daily operations, improve efficiency, and build a stronger transportation business.",
  },
};

document.addEventListener("click", (event) => {
  const trigger = event.target.closest(".service-trigger");

  if (!trigger) return;

  event.stopPropagation();

  const service = serviceInfo[trigger.dataset.service];

  if (!service) return;

  serviceModalLabel.textContent = service.category;
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

document.querySelectorAll(".modal-contact-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    serviceModal.classList.remove("active");

    setTimeout(() => {
      document.querySelector("#contact").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 250);
  });
});

const revealElements = document.querySelectorAll(".reveal, .reveal-card");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // Run only once
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
