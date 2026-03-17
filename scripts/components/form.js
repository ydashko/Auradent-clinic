// components/form.js
export function initForm() {
  const form = document.getElementById("appointment-form");
  const successBlock = document.getElementById("form-success");
  const phoneInput = document.getElementById("phone");
  if (!form) return;

  // Маска телефона
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "");
      if (!value.startsWith("38")) value = "38" + value;
      value = value.substring(0, 12);

      let formatted = "+38";
      if (value.length > 2) formatted += " (" + value.substring(2, 5);
      if (value.length >= 5) formatted += ") " + value.substring(5, 8);
      if (value.length >= 8) formatted += "-" + value.substring(8, 10);
      if (value.length >= 10) formatted += "-" + value.substring(10, 12);
      this.value = formatted;
    });

    phoneInput.addEventListener("keypress", (e) => {
      if (!/[0-9]/.test(e.key)) e.preventDefault();
    });
  }

  // Отправка формы
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.company && form.company.value !== "") return; // honeypot

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Відправка...";

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form)
      .then(() => {
        form.classList.add("hide");
        successBlock.classList.add("show");
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

  // Анимация появления формы
  const formSection = document.querySelector("#appointment");
  if (!formSection) return;

  const title = formSection.querySelector(".form__title");
  const image = formSection.querySelector(".form__image");
  const formEl = formSection.querySelector(".appointment-form");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (title) title.classList.add("is-animated");
          if (image) image.classList.add("is-animated");
          if (formEl) formEl.classList.add("is-animated");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  if (title) observer.observe(title);
  if (image) observer.observe(image);
  if (formEl) observer.observe(formEl);
}
