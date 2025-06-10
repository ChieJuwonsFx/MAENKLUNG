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
const originalImg = "assets/angklung-default.webp";
const imageElement = document.getElementById("angklung-img");
const tooltip = document.getElementById("tooltip");
const line = document.getElementById("dotted-line");
const dotStart = document.getElementById("dot-start");
const dotEnd = document.getElementById("dot-end");
const hotspots = document.querySelectorAll(".hotspot");
const container = document.querySelector(".container");

function positionTooltip(hotspot, hotspotRect, containerRect) {
  const hotspotCenterX =
    hotspotRect.left + hotspotRect.width / 2 - containerRect.left;
  const hotspotCenterY =
    hotspotRect.top + hotspotRect.height / 2 - containerRect.top;
  const tooltipWidth = 250;
  const tooltipHeight = 150;
  const margin = 20;

  if (hotspot.classList.contains("tatapakan")) {
    tooltip.style.bottom = containerRect.height - hotspotRect.top + 10 + "px";
    if (window.innerWidth <= 768) {
      tooltip.style.bottom = "0";
      tooltip.style.top = "auto";
    } else {
      tooltip.style.bottom = "auto";
    }
    tooltip.style.left = `${Math.max(10, hotspotCenterX - tooltipWidth / 2)}px`;

    const tooltipRect = tooltip.getBoundingClientRect();
    const tooltipCenterX =
      tooltipRect.left + tooltipRect.width / 2 - containerRect.left;
    const tooltipBottom = tooltipRect.bottom - containerRect.top;

    const dx = hotspotCenterX - tooltipCenterX;
    const dy = hotspotRect.top - containerRect.top - tooltipBottom;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    line.style.width = `${distance}px`;
    line.style.left = `${tooltipCenterX}px`;
    line.style.top = `${tooltipBottom}px`;
    line.style.transform = `rotate(${angle}deg)`;

    dotStart.style.left = `${tooltipCenterX - 3}px`;
    dotStart.style.top = `${tooltipBottom - 3}px`;
    dotEnd.style.left = `${hotspotCenterX - 3}px`;
    dotEnd.style.top = `${hotspotRect.top - containerRect.top - 3}px`;
  } else if (hotspot.classList.contains("jejer")) {
    tooltip.style.top = hotspotRect.bottom - containerRect.top + 10 + "px";

    if (window.innerWidth <= 768) {
      tooltip.style.bottom = "0";
      tooltip.style.top = "auto";
    } else {
      tooltip.style.bottom = "auto";
    }
    tooltip.style.left = `${Math.max(10, hotspotCenterX - tooltipWidth / 2)}px`;

    const tooltipRect = tooltip.getBoundingClientRect();
    const tooltipCenterX =
      tooltipRect.left + tooltipRect.width / 2 - containerRect.left;
    const tooltipTop = tooltipRect.top - containerRect.top;

    const dx = hotspotCenterX - tooltipCenterX;
    const dy = hotspotRect.bottom - containerRect.top - tooltipTop;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    line.style.width = `${distance}px`;
    line.style.left = `${tooltipCenterX}px`;
    line.style.top = `${tooltipTop}px`;
    line.style.transform = `rotate(${angle}deg)`;

    dotStart.style.left = `${tooltipCenterX - 3}px`;
    dotStart.style.top = `${tooltipTop - 3}px`;
    dotEnd.style.left = `${hotspotCenterX - 3}px`;
    dotEnd.style.top = `${hotspotRect.bottom - containerRect.top - 3}px`;
  } else {
    const spaceRight = containerRect.width - hotspotCenterX - margin;
    const spaceLeft = hotspotCenterX - margin;
    const spaceTop = hotspotCenterY - margin;
    const spaceBottom = containerRect.height - hotspotCenterY - margin;

    if (spaceRight > tooltipWidth) {
      tooltip.style.left = `${hotspotCenterX + margin}px`;
      tooltip.style.top = `${Math.max(
        margin,
        Math.min(
          hotspotCenterY - tooltipHeight / 2,
          containerRect.height - tooltipHeight - margin
        )
      )}px`;
    } else if (spaceLeft > tooltipWidth) {
      tooltip.style.left = `${Math.max(
        margin,
        hotspotCenterX - tooltipWidth - margin
      )}px`;
      tooltip.style.top = `${Math.max(
        margin,
        Math.min(
          hotspotCenterY - tooltipHeight / 2,
          containerRect.height - tooltipHeight - margin
        )
      )}px`;
    } else {
      if (spaceTop > spaceBottom) {
        tooltip.style.top = `${Math.max(
          margin,
          hotspotCenterY - tooltipHeight - margin
        )}px`;
        tooltip.style.left = `${Math.max(
          margin,
          Math.min(
            hotspotCenterX - tooltipWidth / 2,
            containerRect.width - tooltipWidth - margin
          )
        )}px`;
      } else {
        tooltip.style.top = `${hotspotCenterY + margin}px`;
        tooltip.style.left = `${Math.max(
          margin,
          Math.min(
            hotspotCenterX - tooltipWidth / 2,
            containerRect.width - tooltipWidth - margin
          )
        )}px`;
      }
    }

    const tooltipRect = tooltip.getBoundingClientRect();
    const tooltipCenterX =
      tooltipRect.left + tooltipRect.width / 2 - containerRect.left;
    const tooltipCenterY =
      tooltipRect.top + tooltipRect.height / 2 - containerRect.top;

    const dx = hotspotCenterX - tooltipCenterX;
    const dy = hotspotCenterY - tooltipCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    line.style.width = `${distance}px`;
    line.style.left = `${tooltipCenterX}px`;
    line.style.top = `${tooltipCenterY}px`;
    line.style.transform = `rotate(${angle}deg)`;

    dotStart.style.left = `${tooltipCenterX - 3}px`;
    dotStart.style.top = `${tooltipCenterY - 3}px`;
    dotEnd.style.left = `${hotspotCenterX - 3}px`;
    dotEnd.style.top = `${hotspotCenterY - 3}px`;
  }
}

hotspots.forEach((hotspot) => {
  hotspot.addEventListener("mouseenter", () => {
    const imgSrc = hotspot.dataset.img;
    const text = hotspot.dataset.tooltip;

    imageElement.src = imgSrc;
    tooltip.innerHTML = text;
    tooltip.classList.add("visible");

    const containerRect = container.getBoundingClientRect();
    const hotspotRect = hotspot.getBoundingClientRect();

    positionTooltip(hotspot, hotspotRect, containerRect);

    line.style.transformOrigin = "0 0";
    line.style.display = "block";
    dotStart.style.display = "block";
    dotEnd.style.display = "block";
  });

  hotspot.addEventListener("mouseleave", () => {
    imageElement.src = originalImg;
    tooltip.classList.remove("visible");
    line.style.display = "none";
    dotStart.style.display = "none";
    dotEnd.style.display = "none";
  });
});

window.addEventListener("resize", () => {
  if (tooltip.classList.contains("visible")) {
    const visibleHotspot = document.querySelector(".hotspot:hover");
    if (visibleHotspot) {
      const containerRect = container.getBoundingClientRect();
      const hotspotRect = visibleHotspot.getBoundingClientRect();
      positionTooltip(visibleHotspot, hotspotRect, containerRect);
    }
  }
});
