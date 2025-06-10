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

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

const animateCounters = () => {
  const counters = document.querySelectorAll(".text-2xl.font-bold");
  counters.forEach((counter) => {
    const target = counter.textContent;
    if (
      target.includes("18 November 2010") ||
      target.includes("20+") ||
      target.includes("15.110")
    ) {
      counter.style.animation = "pulse 2s infinite";
    }
  });
};

const style = document.createElement("style");
style.textContent = `
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }
        `;
document.head.appendChild(style);

window.addEventListener("load", () => {
  setTimeout(animateCounters, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
  const desktopCards = document.getElementById("desktopCardsContainer");
  const mobileCards = document.getElementById("mobileCardsContainer");

  function initCards() {
    if (window.innerWidth < 768) {
      desktopCards.classList.add("hidden");
      mobileCards.classList.remove("hidden");
    } else {
      desktopCards.classList.remove("hidden");
      mobileCards.classList.add("hidden");
      initDesktopCards();
    }
  }

  function initDesktopCards() {
    const cards = document.querySelectorAll("#desktopCardsContainer .card");
    let activeCard = cards[0];

    activeCard.classList.add("flex-[6]", "active");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        cards.forEach((c) => {
          c.classList.remove("flex-[6]", "active");
          c.classList.add("flex-[0.5]");
        });

        card.classList.remove("flex-[0.5]");
        card.classList.add("flex-[6]", "active");
      });

      card.addEventListener("mouseleave", () => {
        setTimeout(() => {
          if (![...cards].some((c) => c.matches(":hover"))) {
            cards.forEach((c) => {
              c.classList.remove("flex-[6]", "active");
              c.classList.add("flex-[0.5]");
            });

            activeCard.classList.remove("flex-[0.5]");
            activeCard.classList.add("flex-[6]", "active");
          }
        }, 100);
      });
    });
  }

  document.querySelectorAll(".toggle-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".card-mobile");
      const content = card.querySelector(".description");
      const isActive = card.classList.contains("active");

      document.querySelectorAll(".card-mobile").forEach((c) => {
        if (c !== card) {
          c.classList.remove("active");
          c.querySelector(".description").classList.add("hidden");
          c.querySelector(".toggle-btn").textContent = "Lihat Deskripsi";
        }
      });

      if (isActive) {
        card.classList.remove("active");
        content.classList.add("hidden");
        this.textContent = "Lihat Deskripsi";
      } else {
        card.classList.add("active");
        content.classList.remove("hidden");
        this.textContent = "Tutup Deskripsi";
      }
    });
  });

  initCards();

  window.addEventListener("resize", function () {
    initCards();
  });
});
