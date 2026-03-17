// // components/doctors.js
// export function initDoctors() {
//   const doctorCards = document.querySelectorAll(".doctor-card");
//   const toggleButtons = document.querySelectorAll(".doctor-card__toggle");

//   toggleButtons.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const currentCard = btn.closest(".doctor-card");
//       const expand = currentCard.querySelector(".doctor-card__expand");
//       const isOpen = currentCard.classList.contains("active");

//       // Закрываем все карточки
//       doctorCards.forEach((card) => {
//         const content = card.querySelector(".doctor-card__expand");
//         const button = card.querySelector(".doctor-card__toggle");

//         card.classList.remove("active");
//         content.style.height = "0px";
//         if (button) button.textContent = "Дізнатись більше";
//       });

//       // Если карточка была закрыта — открываем
//       if (!isOpen) {
//         currentCard.classList.add("active");

//         expand.style.height = expand.scrollHeight + "px";
//         btn.textContent = "Згорнути";
//       }
//     });
//   });

//   /* =============================
//      MOBILE DOCTORS SLIDER
//   ============================= */

//   const track = document.querySelector(".doctors__track");
//   const cards = document.querySelectorAll(".doctor-card");
//   const prevBtn = document.querySelector(".doctors__btn--prev");
//   const nextBtn = document.querySelector(".doctors__btn--next");

//   let currentIndex = 0;

//   function isMobile() {
//     return window.innerWidth <= 768;
//   }

//   function closeAllCards() {
//     cards.forEach((card) => {
//       card.classList.remove("active");

//       const expand = card.querySelector(".doctor-card__expand");
//       const button = card.querySelector(".doctor-card__toggle");

//       if (expand) expand.style.height = "0px";
//       if (button) button.textContent = "Дізнатись більше";
//     });
//   }

//   function updateSlider() {
//     if (!isMobile()) {
//       track.style.transform = "none";
//       return;
//     }

//     const cardWidth = cards[0].offsetWidth;

//     const gap = parseInt(getComputedStyle(track).gap) || 0;

//     track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;

//     prevBtn.disabled = currentIndex === 0;
//     nextBtn.disabled = currentIndex === cards.length - 1;
//   }

//   nextBtn.addEventListener("click", () => {
//     if (currentIndex < cards.length - 1) {
//       closeAllCards(); // 🔥 закрываем открытую карточку

//       currentIndex++;
//       updateSlider();
//     }
//   });

//   prevBtn.addEventListener("click", () => {
//     if (currentIndex > 0) {
//       closeAllCards(); // 🔥 закрываем открытую карточку

//       currentIndex--;
//       updateSlider();
//     }
//   });

//   window.addEventListener("resize", () => {
//     currentIndex = 0;
//     closeAllCards();
//     updateSlider();
//   });

//   updateSlider();
// }

// components/doctors.js
export function initDoctors() {
  // ======================================================
  // 1️⃣ Toggle карточек докторов
  // ======================================================
  const doctorCards = document.querySelectorAll(".doctor-card");
  const toggleButtons = document.querySelectorAll(".doctor-card__toggle");

  if (doctorCards.length && toggleButtons.length) {
    toggleButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const currentCard = btn.closest(".doctor-card");
        if (!currentCard) return;
        const expand = currentCard.querySelector(".doctor-card__expand");
        if (!expand) return;
        const isOpen = currentCard.classList.contains("active");

        // Закрываем все карточки
        doctorCards.forEach((card) => {
          const content = card.querySelector(".doctor-card__expand");
          const button = card.querySelector(".doctor-card__toggle");

          card.classList.remove("active");
          if (content) content.style.height = "0px";
          if (button) button.textContent = "Дізнатись більше";
        });

        // Если карточка была закрыта — открываем
        if (!isOpen) {
          currentCard.classList.add("active");
          expand.style.height = expand.scrollHeight + "px";
          btn.textContent = "Згорнути";
        }
      });
    });
  }

  // ======================================================
  // 2️⃣ Mobile Doctors Slider
  // ======================================================
  const track = document.querySelector(".doctors__track");
  const cards = document.querySelectorAll(".doctor-card");
  const prevBtn = document.querySelector(".doctors__btn--prev");
  const nextBtn = document.querySelector(".doctors__btn--next");

  if (!track || !cards.length || !prevBtn || !nextBtn) return; // 🔒 проверка наличия

  let currentIndex = 0;

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
      return;
    }

    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 0;

    track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
  }

  // Обработчики кнопок
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

  window.addEventListener("resize", () => {
    currentIndex = 0;
    closeAllCards();
    updateSlider();
  });

  updateSlider();
}
