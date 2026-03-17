export function initWorksSlider() {
  document.querySelectorAll(".works__slider").forEach((slider) => {
    const worksBlock = slider.closest(".works");
    const track = slider.querySelector(".works__track");
    const slides = slider.querySelectorAll(".works__slide");
    const prevBtn = worksBlock.querySelector(".works__btn--prev");
    const nextBtn = worksBlock.querySelector(".works__btn--next");
    if (!track || !slides.length || !prevBtn || !nextBtn) return;

    let index = 0;
    const totalSlides = slides.length;

    const updateSlider = () => {
      track.style.transition = "transform 0.3s";
      track.style.transform = `translateX(-${index * 100}%)`;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === totalSlides - 1;
    };

    nextBtn.addEventListener("click", () => {
      if (index < totalSlides - 1) index++;
      updateSlider();
    });
    prevBtn.addEventListener("click", () => {
      if (index > 0) index--;
      updateSlider();
    });

    // drag/swipe
    let startX = 0,
      dragging = false;

    const startDrag = (e) => {
      dragging = true;
      track.classList.add("dragging");
      startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    };
    const drag = (e) => {
      if (!dragging) return;
      const x = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
      const walk = x - startX;
      track.style.transition = "none";
      track.style.transform = `translateX(calc(-${index * 100}% + ${walk}px))`;
    };
    const endDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("dragging");
      const x = e.type.includes("mouse")
        ? e.pageX
        : e.changedTouches?.[0]?.clientX || 0;
      const walk = x - startX;
      if (walk < -50 && index < totalSlides - 1) index++;
      if (walk > 50 && index > 0) index--;
      updateSlider();
    };

    track.addEventListener("mousedown", startDrag);
    track.addEventListener("touchstart", startDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchend", endDrag);
    window.addEventListener("mousemove", drag);
    window.addEventListener("touchmove", drag);

    updateSlider();
  });
}
