const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
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
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
};

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      if (index % 2 === 0) {
        entry.target.style.transform = "translateX(0)";
      } else {
        entry.target.style.transform = "translateX(0)";
      }
    }
  });
}, observerOptions);

document
  .querySelectorAll(".relative.flex.items-start")
  .forEach((item, index) => {
    item.style.opacity = "0";
    if (index % 2 === 0) {
      item.style.transform = "translateX(-30px)";
    } else {
      item.style.transform = "translateX(30px)";
    }
    item.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    timelineObserver.observe(item);
  });

const historicalPhotos = document.querySelectorAll(".grayscale");
historicalPhotos.forEach((photo) => {
  photo.addEventListener("mouseenter", () => {
    photo.style.transform = "scale(1.05)";
  });

  photo.addEventListener("mouseleave", () => {
    photo.style.transform = "scale(1)";
  });
});

window.addEventListener("load", () => {
  const heroSection = document.querySelector(".bg-cream");
  heroSection.style.opacity = "0";
  heroSection.style.transform = "translateY(20px)";
  heroSection.style.transition = "opacity 1s ease, transform 1s ease";

  setTimeout(() => {
    heroSection.style.opacity = "1";
    heroSection.style.transform = "translateY(0)";
  }, 100);
});
