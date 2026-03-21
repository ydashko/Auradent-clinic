export function initAboutSlider() {
  const slider = document.querySelector(".about-slider");
  if (slider) {
    const track = slider.querySelector(".about-slider__track");
    const slides = slider.querySelectorAll(".about-slider__slide");

    const prev = slider.querySelector(".about-slider__btn--prev");
    const next = slider.querySelector(".about-slider__btn--next");

    let index = 0;
    let slideWidth = 0;

    function getVisibleSlides() {
      const width = window.innerWidth;

      if (width <= 768) return 2;
      if (width <= 1024) return 2.2;
      return 3;
    }

    function updateSizes() {
      slideWidth = slides[0].offsetWidth + 24;
    }

    function updateSlider() {
      updateSizes();
      track.style.transform = `translateX(-${index * slideWidth}px)`;
      const maxIndex = slides.length - Math.floor(getVisibleSlides());
      prev.disabled = index === 0;
      next.disabled = index >= maxIndex;
    }

    next.addEventListener("click", () => {
      index++;
      updateSlider();
    });

    prev.addEventListener("click", () => {
      index--;
      updateSlider();
    });

    window.addEventListener("resize", updateSlider);

    updateSlider();

    let startX = 0;
    let dragging = false;

    track.addEventListener("mousedown", startDrag);
    track.addEventListener("touchstart", startDrag);

    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchend", endDrag);

    window.addEventListener("mousemove", drag);
    window.addEventListener("touchmove", drag);

    function startDrag(e) {
      dragging = true;
      track.classList.add("dragging");
      startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    }

    function drag(e) {
      if (!dragging) return;
      const x = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
      const walk = x - startX;
      track.style.transform = `translateX(${-(index * slideWidth) + walk}px)`;
    }

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("dragging");

      const x = e.type.includes("mouse")
        ? e.pageX
        : e.changedTouches?.[0]?.clientX || 0;

      const walk = x - startX;

      if (walk < -50) index++;
      if (walk > 50) index--;

      const maxIndex = slides.length - Math.floor(getVisibleSlides());
      index = Math.max(0, Math.min(index, maxIndex));

      updateSlider();
    }
  }
}
