const menuButton = document.getElementById("menuButton");
const menuPanel = document.getElementById("menuPanel");
const siteHeader = document.getElementById("siteHeader");

if (menuButton && menuPanel) {
  menuButton.addEventListener("click", () => {
    menuPanel.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(menuPanel.classList.contains("open")));
  });
}

if (siteHeader) {
  const syncHeaderState = () => {
    siteHeader.classList.toggle("scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", syncHeaderState, { passive: true });
  syncHeaderState();
}

const track = document.getElementById("carouselTrack");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");
const dotsContainer = document.getElementById("carouselDots");

if (track && prevSlide && nextSlide) {
  const totalSlides = track.children.length;
  let index = 0;
  const dots = dotsContainer ? dotsContainer.querySelectorAll(".dot") : [];
  let autoSlide;

  const renderSlide = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active-dot", dotIndex === index);
    });
  };

  const restartAutoSlide = () => {
    if (autoSlide) {
      clearInterval(autoSlide);
    }
    autoSlide = setInterval(() => {
      index = (index + 1) % totalSlides;
      renderSlide();
    }, 4500);
  };

  prevSlide.addEventListener("click", () => {
    index = (index - 1 + totalSlides) % totalSlides;
    renderSlide();
    restartAutoSlide();
  });

  nextSlide.addEventListener("click", () => {
    index = (index + 1) % totalSlides;
    renderSlide();
    restartAutoSlide();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetSlide = Number(dot.getAttribute("data-slide"));
      if (!Number.isNaN(targetSlide)) {
        index = targetSlide;
        renderSlide();
        restartAutoSlide();
      }
    });
  });

  renderSlide();
  restartAutoSlide();
}

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((element) => observer.observe(element));
}
