// components/reviews.js
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

    const slider = reviewsSection.querySelector(".reviews-slider");
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

  // анимация заголовка и слайдера
  const title = reviewsSection.querySelector(".reviews__title");
  const slider = reviewsSection.querySelector(".reviews-slider");

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
