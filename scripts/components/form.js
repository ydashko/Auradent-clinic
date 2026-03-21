// import emailjs from "@emailjs/browser";

export function initForm() {
  const form = document.getElementById("appointment-form");

  if (!form) return;
  const successBlock = document.getElementById("form-success");
  const phoneInput = document.getElementById("phone");
  const formInner = form.closest(".form__inner");

  if (!form) return;

  if (typeof emailjs !== "undefined") {
    emailjs.init("RnkPcapm77yZE_TXM");
  }

  let lastSubmitTime = 0;
  const formStartTime = Date.now();

  function sanitize(str) {
    return str.replace(/[<>]/g, "");
  }

  function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, "");

    if (!cleaned.startsWith("380")) return false;

    return cleaned.length === 12;
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "");

      if (value.startsWith("0")) value = "38" + value;
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

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (form.company && form.company.value !== "") return;

    if (Date.now() - formStartTime < 3000) {
      alert("Занадто швидко 😉");
      return;
    }

    if (Date.now() - lastSubmitTime < 15000) {
      alert("Зачекайте перед повторною відправкою");
      return;
    }

    lastSubmitTime = Date.now();

    const phoneValue = form.phone.value;
    if (!validatePhone(phoneValue)) {
      alert("Некоректний номер телефону");
      return;
    }

    form.name.value = sanitize(form.name.value);
    form.reason.value = sanitize(form.reason.value);

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Відправка...";

    emailjs
      .sendForm("service_ca5hhyt", "template_i532tlp", form)
      .then(() => {
        formInner.classList.add("is-success");

        successBlock.classList.add("show");

        setTimeout(() => {
          successBlock.classList.add("is-animated");
        }, 50);

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
