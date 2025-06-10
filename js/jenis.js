const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
    mobileMenu.classList.add("hidden");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.classList.add("shadow-lg");
  } else {
    header.classList.remove("shadow-lg");
  }
});

const slider = document.getElementById("slider");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const cards = document.querySelectorAll(".angklung-card");

let currentIndex = 0;
const cardWidth = 320;
const visibleCards = Math.floor(slider.offsetWidth / cardWidth);
const totalCards = cards.length;
const maxIndex = Math.max(0, totalCards - visibleCards);

function updateSlider() {
  const scrollPosition = currentIndex * cardWidth;
  slider.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= maxIndex;

  if (prevBtn.disabled) {
    prevBtn.classList.add("opacity-50", "cursor-not-allowed");
  } else {
    prevBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }

  if (nextBtn.disabled) {
    nextBtn.classList.add("opacity-50", "cursor-not-allowed");
  } else {
    nextBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateSlider();
  }
});

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("hovered");

    const expandIcon = card.querySelector(".expand-icon");
    if (expandIcon) {
      expandIcon.style.transform = "scale(1.1)";
    }

    const cardRect = card.getBoundingClientRect();
    const sliderRect = slider.getBoundingClientRect();

    if (cardRect.right > sliderRect.right) {
      slider.scrollBy({
        left: cardRect.right - sliderRect.right + 20,
        behavior: "smooth",
      });
    } else if (cardRect.left < sliderRect.left) {
      slider.scrollBy({
        left: cardRect.left - sliderRect.left - 20,
        behavior: "smooth",
      });
    }
    const scrollLeft = slider.scrollLeft;
    const sliderWidth = slider.offsetWidth;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;

    if (cardLeft < scrollLeft) {
      slider.scrollTo({
        left: cardLeft - 20,
        behavior: "smooth",
      });
    } else if (cardLeft + cardWidth > scrollLeft + sliderWidth) {
      slider.scrollTo({
        left: cardLeft + cardWidth - sliderWidth + 20,
        behavior: "smooth",
      });
    }
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("hovered");

    const expandIcon = card.querySelector(".expand-icon");
    if (expandIcon) {
      expandIcon.style.transform = "scale(1)";
    }
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

cards.forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = `opacity 0.6s ease ${
    index * 0.1
  }s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});
