//default

import { initTeam } from "./components/team.js";
import { initMenu } from "./components/menu.js";

document.addEventListener("DOMContentLoaded", () => {
  initTeam();
  initMenu();
});

//header-animation
const header = document.querySelector(".header");

if (header) {
  window.addEventListener("load", () => {
    header.classList.add("header--animated");
  });
}

//trust-animation
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section--animated");
      }
    });
  },
  { threshold: 0.3 },
);

sections.forEach((section) => observer.observe(section));

document.addEventListener("DOMContentLoaded", () => {
  /*  WORKS SLIDERS */

  const sliders = document.querySelectorAll(".works__slider");

  sliders.forEach((slider) => {
    const worksBlock = slider.closest(".works");

    const track = slider.querySelector(".works__track");
    const slides = slider.querySelectorAll(".works__slide");

    const prevBtn = worksBlock.querySelector(".works__btn--prev");
    const nextBtn = worksBlock.querySelector(".works__btn--next");

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === totalSlides - 1;
    }

    nextBtn.addEventListener("click", () => {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
        updateSlider();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    updateSlider();
  });

  //animation-wokrs

  const animatedBlocks = document.querySelectorAll(
    ".animate-on-scroll, .price",
  );

  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          animationObserver.unobserve(entry.target); // чтобы анимация один раз
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  animatedBlocks.forEach((block) => {
    animationObserver.observe(block);
  });

  /*
     DOCTOR CARD TOGGLE
  */

  const doctorCards = document.querySelectorAll(".doctor-card");
  const toggleButtons = document.querySelectorAll(".doctor-card__toggle");

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentCard = btn.closest(".doctor-card");
      const expand = currentCard.querySelector(".doctor-card__expand");
      const isOpen = currentCard.classList.contains("active");

      // Закрываем все карточки
      doctorCards.forEach((card) => {
        const content = card.querySelector(".doctor-card__expand");
        const button = card.querySelector(".doctor-card__toggle");

        card.classList.remove("active");
        content.style.height = "0px";
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

  /* =============================
     MOBILE DOCTORS SLIDER
  ============================= */

  const track = document.querySelector(".doctors__track");
  const cards = document.querySelectorAll(".doctor-card");
  const prevBtn = document.querySelector(".doctors__btn--prev");
  const nextBtn = document.querySelector(".doctors__btn--next");

  if (!track || !cards.length || !prevBtn || !nextBtn) return;

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
});

//services animation
const servicesSection = document.querySelector(".services");

if (servicesSection) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section--animated");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -120px 0px",
    },
  );

  observer.observe(servicesSection);
}

//

const services = document.querySelectorAll(".service");

function closeAll() {
  services.forEach((item) => {
    item.classList.remove("is-open", "is-tablet");
    item.style.backgroundImage = "";

    const imageBox = item.querySelector(".service__image");
    if (imageBox) {
      imageBox.style.backgroundImage = "";
      imageBox.style.opacity = "";
      imageBox.style.transform = "";
    }
  });
}

services.forEach((item) => {
  item.addEventListener("click", function (e) {
    const width = window.innerWidth;

    const isMobile = width <= 768;
    const isTablet = width > 768 && width <= 1024;

    const isActive =
      this.classList.contains("is-open") ||
      this.classList.contains("is-tablet");

    // если карточка уже активна → просто закрываем
    if (isActive) {
      closeAll();
      e.stopPropagation();
      return;
    }

    // иначе сначала закрываем все
    closeAll();

    // 📱 MOBILE
    if (isMobile) {
      this.classList.add("is-open");

      const bg = this.dataset.bg;
      if (bg) {
        this.style.backgroundImage = `url(${bg})`;
      }
    }

    // 📲 TABLET
    if (isTablet) {
      this.classList.add("is-tablet");

      const bg = this.dataset.bg;
      const imageBox = this.querySelector(".service__image");

      if (bg && imageBox) {
        imageBox.style.backgroundImage = `url(${bg})`;
        imageBox.style.backgroundSize = "cover";
        imageBox.style.backgroundPosition = "center";
        imageBox.style.backgroundRepeat = "no-repeat";
        imageBox.style.opacity = "1";
        imageBox.style.transform = "translateX(0)";
      }
    }

    e.stopPropagation();
  });
});

// клик вне карточек
document.addEventListener("click", function (e) {
  if (!e.target.closest(".service")) {
    closeAll();
  }
});

//faq-animation

const faqSectionObserver = document.querySelector(".section");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        faqSectionObserver.classList.add("section--animated");
        sectionObserver.unobserve(faqSectionObserver);
      }
    });
  },
  { threshold: 0.5 },
);

// sectionObserver.observe(faqSectionObserver);
if (faqSectionObserver) {
  sectionObserver.observe(faqSectionObserver);
}

document.querySelectorAll(".faq").forEach((faq) => {
  const wrapper = faq.querySelector(".faq__answer-wrapper");
  const icon = faq.querySelector(".faq__icon");

  // инициализация
  wrapper.style.maxHeight = "0px";
  wrapper.style.overflow = "hidden";
  wrapper.style.transition = "max-height 0.35s ease, opacity 0.35s ease";
  wrapper.style.opacity = "0";

  faq.addEventListener("toggle", () => {
    if (faq.open) {
      // открытие
      const height = wrapper.scrollHeight;
      wrapper.style.maxHeight = height + "px";
      wrapper.style.opacity = "1";
      if (icon) icon.style.transform = "rotate(45deg)";
    } else {
      // закрытие
      // сначала установим текущую высоту, чтобы transition сработал
      wrapper.style.maxHeight = wrapper.scrollHeight + "px";

      requestAnimationFrame(() => {
        wrapper.style.maxHeight = "0px";
        wrapper.style.opacity = "0";
        if (icon) icon.style.transform = "rotate(0deg)";
      });
    }
  });
});

//form
// ===== 1. ИНИЦИАЛИЗАЦИЯ EMAILJS ===== отключил не удалять
// (function () {
//   emailjs.init("YOUR_PUBLIC_KEY"); // ← вставь свой ключ
// })();

// ===== 2. DOM ЭЛЕМЕНТЫ =====
const form = document.getElementById("appointment-form");
const successBlock = document.getElementById("form-success");
const phoneInput = document.getElementById("phone");

// ===== 3. МАСКА ТЕЛЕФОНА =====

if (phoneInput) {
  phoneInput.addEventListener("input", function (e) {
    let value = this.value.replace(/\D/g, ""); // только цифры

    // если пользователь удалил + — возвращаем 38
    if (!value.startsWith("38")) {
      value = "38" + value;
    }

    value = value.substring(0, 12); // ограничение по длине

    let formatted = "+38";

    if (value.length > 2) {
      formatted += " (" + value.substring(2, 5);
    }
    if (value.length >= 5) {
      formatted += ") " + value.substring(5, 8);
    }
    if (value.length >= 8) {
      formatted += "-" + value.substring(8, 10);
    }
    if (value.length >= 10) {
      formatted += "-" + value.substring(10, 12);
    }

    this.value = formatted;
  });

  // запрет ввода букв
  phoneInput.addEventListener("keypress", function (e) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });
}

// ===== 4. ОБРАБОТКА ОТПРАВКИ =====
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // ----- Honeypot защита -----
    if (form.company && form.company.value !== "") {
      return; // бот заполнил скрытое поле
    }

    // ----- Проверка HTML5 валидации -----
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // ----- Блокируем кнопку чтобы не было дублей -----
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Відправка...";

    // ----- Отправка EmailJS -----
    emailjs
      .sendForm(
        "YOUR_SERVICE_ID", // ← твой service ID
        "YOUR_TEMPLATE_ID", // ← твой template ID
        form,
      )
      .then(() => {
        // скрываем форму
        form.classList.add("hide");

        // показываем success
        successBlock.classList.add("show");

        // сбрасываем форму
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        alert("Сталася помилка при відправці. Спробуйте ще раз.");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Записатись на прийом";
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const formSection = document.querySelector("#appointment");
  if (!formSection) return;

  const title = formSection.querySelector(".form__title");
  const image = formSection.querySelector(".form__image");
  const form = formSection.querySelector(".appointment-form");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (title) title.classList.add("is-animated");
          if (image) image.classList.add("is-animated");
          if (form) form.classList.add("is-animated");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  // Наблюдаем за всеми элементами одновременно
  if (title) observer.observe(title);
  if (image) observer.observe(image);
  if (form) observer.observe(form);
});

// second

// document
//   .querySelector(".header__btn--primary")
//   .addEventListener("click", function (e) {
//     e.preventDefault();

//     document.querySelector("#appointment").scrollIntoView({
//       behavior: "smooth",
//     });
//   });

document.addEventListener("DOMContentLoaded", () => {
  const reviewsSection = document.querySelector(".reviews");
  if (!reviewsSection) return; // если секции нет — выходим

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

  function getActiveTrack() {
    return reviewsSection.querySelector(".reviews__track.is-active");
  }

  function updateButtonsState(maxIndex) {
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  function updateSlider() {
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

    if (translate > maxTranslate) {
      translate = maxTranslate;
    }

    activeTrack.style.transform = `translateX(-${translate}px)`;

    const maxIndex = Math.ceil(maxTranslate / fullWidth);

    updateButtonsState(maxIndex);

    if (moreBtn) {
      if (currentSource === "google") {
        moreBtn.href =
          "https://www.google.com/search?sca_esv=df890eccffbfa804&sxsrf=ANbL-n6G1uk6zrUSUJuF-KQrb1FEf2DyLA:1773332461437&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOaakytBDen6SkfjDrw7jxxx5ev-UHH82isZKLO0s-6BimIA5bTWQapCwjvC2cNKd4FNC_qsROSr_MslHtXp_G2e_m2OVMR42zfcTcZPhQC-Q22v8lOTId6USp_a-uI5O1GBsLzo%3D&q=%D0%A1%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F+%22AURA+dent%22+%D0%9E%D1%82%D0%B7%D1%8B%D0%B2%D1%8B&sa=X&ved=2ahUKEwio0rqb4pqTAxWFNxAIHbjwJ5EQ0bkNegQIHhAF&biw=1947&bih=1328&dpr=1";
        moreBtn.textContent = "Переглянути більше в Google";
      } else {
        moreBtn.href = "https://www.instagram.com/auradentkyiv/";
        moreBtn.textContent = "Переглянути більше в Instagram";
      }
    }
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

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex--;
      updateSlider();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex++;
      updateSlider();
    });
  }

  window.addEventListener("resize", updateSlider);

  updateSlider();
});

document.addEventListener("DOMContentLoaded", () => {
  const reviewsSection = document.querySelector(".reviews");
  if (!reviewsSection) return;

  const title = reviewsSection.querySelector(".reviews__title");
  const slider = reviewsSection.querySelector(".reviews-slider");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (title) title.classList.add("is-animated");
          if (slider) slider.classList.add("is-animated");
          obs.unobserve(entry.target); // анимация один раз
        }
      });
    },
    { threshold: 0.3 }, // срабатывает, когда 30% блока видно
  );

  if (title) observer.observe(title);
  if (slider) observer.observe(slider);
});

//slider not on main page
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

  // DRAG / SWIPE
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

document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".footer");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footer.classList.add("footer--visible");
          observer.unobserve(footer);
        }
      });
    },
    { threshold: 0.1 },
  );

  observer.observe(footer);
});
