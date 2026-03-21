export function initDoctors() {
  const doctorCards = document.querySelectorAll(".doctor-card");
  const toggleButtons = document.querySelectorAll(".doctor-card__toggle");
  let isMoved = false;

  if (doctorCards.length && toggleButtons.length) {
    toggleButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (isMoved) {
          e.preventDefault();
          return;
        }

        const currentCard = btn.closest(".doctor-card");
        if (!currentCard) return;

        const expand = currentCard.querySelector(".doctor-card__expand");
        if (!expand) return;

        const isOpen = currentCard.classList.contains("active");

        doctorCards.forEach((card) => {
          const content = card.querySelector(".doctor-card__expand");
          const button = card.querySelector(".doctor-card__toggle");

          card.classList.remove("active");
          if (content) content.style.height = "0px";
          if (button) button.textContent = "Дізнатись більше";
        });

        if (!isOpen) {
          currentCard.classList.add("active");
          expand.style.height = expand.scrollHeight + "px";
          btn.textContent = "Згорнути";
        }
      });
    });
  }

  const track = document.querySelector(".doctors__track");
  const cards = document.querySelectorAll(".doctor-card");
  const prevBtn = document.querySelector(".doctors__btn--prev");
  const nextBtn = document.querySelector(".doctors__btn--next");

  if (!track || !cards.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  prevBtn.disabled = true;
  nextBtn.disabled = cards.length <= 1;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function closeAllCards() {
    cards.forEach((card) => {
      card.classList.remove("active");
      const expand = card.querySelector(".doctor-card__expand");
      const button = card.querySelector(".doctor-card__toggle");
      if (expand) expand.style.height = "0px";
      if (button) button.textContent = "Дізнатись більше";
    });
  }

  function updateSlider() {
    if (!isMobile()) {
      track.style.transform = "none";

      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 0;

    track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
  }

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  const getPositionX = (e) =>
    e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;

  const dragStart = (e) => {
    if (!isMobile()) return;

    const targetCard = e.target.closest(".doctor-card");
    if (targetCard && targetCard.classList.contains("active")) {
      isDragging = false;
      return;
    }

    isDragging = true;
    isMoved = false;
    startX = getPositionX(e);

    const style = window.getComputedStyle(track);
    const matrix = new DOMMatrixReadOnly(style.transform);
    prevTranslate = matrix.m41;

    track.style.transition = "none";
  };

  const dragMove = (e) => {
    if (!isDragging) return;

    const currentX = getPositionX(e);
    const delta = currentX - startX;

    if (Math.abs(delta) > 5) {
      isMoved = true;
    }

    currentTranslate = prevTranslate + delta;
    track.style.transform = `translateX(${currentTranslate}px)`;
  };

  const dragEnd = () => {
    if (!isDragging) return;
    isDragging = false;

    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 0;

    const movedBy = currentTranslate - prevTranslate;

    let shouldMove = false;

    if (isMoved && movedBy < -50 && currentIndex < cards.length - 1) {
      currentIndex++;
      shouldMove = true;
    }

    if (isMoved && movedBy > 50 && currentIndex > 0) {
      currentIndex--;
      shouldMove = true;
    }

    if (shouldMove) {
      closeAllCards();
    }

    track.style.transition = "transform 0.3s ease";
    updateSlider();

    setTimeout(() => {
      isMoved = false;
    }, 0);
  };

  track.addEventListener("mousedown", dragStart);
  track.addEventListener("touchstart", dragStart);

  track.addEventListener("mousemove", dragMove);
  track.addEventListener("touchmove", dragMove);

  track.addEventListener("mouseup", dragEnd);
  track.addEventListener("mouseleave", dragEnd);
  track.addEventListener("touchend", dragEnd);

  requestAnimationFrame(updateSlider);
  window.addEventListener("load", updateSlider);

  nextBtn.addEventListener("click", () => {
    if (currentIndex < cards.length - 1) {
      closeAllCards();
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      closeAllCards();
      currentIndex--;
      updateSlider();
    }
  });
}
