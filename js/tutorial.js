const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  const fifthAccordion = document.querySelector(".accordion-item:nth-child(5)");
  if (fifthAccordion) {
    const fifthContent = fifthAccordion.querySelector(".accordion-content");
    const fifthArrow = fifthAccordion.querySelector(".accordion-arrow");
    fifthContent.classList.add("active");
    fifthArrow.classList.add("active");
  }

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      const accordionContent = header.nextElementSibling;
      const accordionArrow = header.querySelector(".accordion-arrow");

      accordionContent.classList.toggle("active");
      accordionArrow.classList.toggle("active");

      document.querySelectorAll(".accordion-item").forEach((item) => {
        if (item !== accordionItem) {
          const content = item.querySelector(".accordion-content");
          const arrow = item.querySelector(".accordion-arrow");
          content.classList.remove("active");
          arrow.classList.remove("active");
        }
      });
    });
  });
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

const videoThumbnail = document.querySelector(".aspect-w-16");
if (videoThumbnail) {
  videoThumbnail.addEventListener("click", () => {
    const videoUrl = "https://www.youtube.com/embed/7aCftg3ufyo?autoplay=1";
    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", videoUrl);
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    );
    iframe.style.position = "absolute";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";

    const thumbnailContainer = videoThumbnail.querySelector(".relative");
    thumbnailContainer.innerHTML = "";
    thumbnailContainer.appendChild(iframe);
  });
}

const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const stepObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".step-circle").forEach((step) => {
  const stepContainer = step.closest(".grid");
  stepContainer.style.opacity = "0";
  stepContainer.style.transform = "translateY(30px)";
  stepContainer.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  stepObserver.observe(stepContainer);
});
