export function initReviews() {
  const reviewsSection = document.querySelector(".reviews");
  if (!reviewsSection) return;

  const toggleButtons = reviewsSection.querySelectorAll(
    ".reviews-toggle button",
  );
  const tracks = reviewsSection.querySelectorAll(".reviews__track");
  const prevBtn = reviewsSection.querySelector(".prev");
  const nextBtn = reviewsSection.querySelector(".next");
  const moreBtn = reviewsSection.querySelector(".reviews-more");
  const slider = reviewsSection.querySelector(".reviews-slider");

  if (!toggleButtons.length || !tracks.length) return;

  let currentSource = "google";
  let currentIndex = 0;

  const getActiveTrack = () =>
    reviewsSection.querySelector(".reviews__track.is-active");

  const updateButtonsState = (maxIndex) => {
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  };

  const updateSlider = () => {
    const activeTrack = getActiveTrack();
    if (!activeTrack) return;

    const cards = activeTrack.querySelectorAll(".review__card");
    if (!cards.length) {
      updateButtonsState(0);
      return;
    }

    const sliderWidth = slider.offsetWidth;
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(activeTrack).gap) || 0;
    const fullWidth = cardWidth + gap;
    const maxTranslate = activeTrack.scrollWidth - sliderWidth;

    let translate = currentIndex * fullWidth;
    if (translate > maxTranslate) translate = maxTranslate;

    activeTrack.style.transform = `translateX(-${translate}px)`;

    const maxIndex = Math.ceil(maxTranslate / fullWidth);
    updateButtonsState(maxIndex);

    if (moreBtn) {
      if (currentSource === "google") {
        moreBtn.href = "https://www.google.com/search?q=AURA+dent";
        moreBtn.textContent = "Переглянути більше в Google";
      } else {
        moreBtn.href = "https://www.instagram.com/auradentkyiv/";
        moreBtn.textContent = "Переглянути більше в Instagram";
      }
    }
  };

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  const getPositionX = (e) =>
    e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;

  const dragStart = (e) => {
    const activeTrack = getActiveTrack();
    if (!activeTrack) return;

    isDragging = true;
    startX = getPositionX(e);

    const style = window.getComputedStyle(activeTrack);
    const matrix = new DOMMatrixReadOnly(style.transform);
    prevTranslate = matrix.m41;

    activeTrack.style.transition = "none";
  };

  const dragMove = (e) => {
    if (!isDragging) return;

    const activeTrack = getActiveTrack();
    if (!activeTrack) return;

    const currentX = getPositionX(e);
    const delta = currentX - startX;
    currentTranslate = prevTranslate + delta;

    activeTrack.style.transform = `translateX(${currentTranslate}px)`;
  };

  const dragEnd = () => {
    if (!isDragging) return;
    isDragging = false;

    const activeTrack = getActiveTrack();
    if (!activeTrack) return;

    const cards = activeTrack.querySelectorAll(".review__card");
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(activeTrack).gap) || 0;
    const fullWidth = cardWidth + gap;

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50) currentIndex++;
    if (movedBy > 50) currentIndex--;

    activeTrack.style.transition = "transform 0.3s ease";
    updateSlider();
  };

  if (slider) {
    slider.addEventListener("mousedown", dragStart);
    slider.addEventListener("touchstart", dragStart);

    slider.addEventListener("mousemove", dragMove);
    slider.addEventListener("touchmove", dragMove);

    slider.addEventListener("mouseup", dragEnd);
    slider.addEventListener("mouseleave", dragEnd);
    slider.addEventListener("touchend", dragEnd);
  }

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) return;

      toggleButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentSource = btn.dataset.source;
      currentIndex = 0;

      tracks.forEach((track) => {
        track.classList.remove("is-active");
        track.style.transform = "translateX(0)";
      });

      const newActive = reviewsSection.querySelector(
        `.reviews__track[data-source="${currentSource}"]`,
      );

      if (newActive) newActive.classList.add("is-active");

      updateSlider();
    });
  });

  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      currentIndex--;
      updateSlider();
    });

  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      currentIndex++;
      updateSlider();
    });

  window.addEventListener("resize", updateSlider);
  updateSlider();

  const title = reviewsSection.querySelector(".reviews__title");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (title) title.classList.add("is-animated");
          if (slider) slider.classList.add("is-animated");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  if (title) observer.observe(title);
  if (slider) observer.observe(slider);
}
