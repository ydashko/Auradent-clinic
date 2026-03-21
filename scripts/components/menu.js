export function initMenu() {
  const dialog = document.querySelector(".tablet-overlay");
  const openBtn = document.querySelector(".burger-button");
  const closeBtn = document.querySelector(".cross-button");

  if (!dialog || !openBtn || !closeBtn) return;

  function openMenu() {
    dialog.showModal();

    requestAnimationFrame(() => {
      dialog.classList.add("is-open");
    });

    document.body.classList.add("no-scroll");
  }

  function closeMenu() {
    dialog.classList.remove("is-open");

    const animatedItems = dialog.querySelectorAll(
      ".tablet-overlay__item, .tablet-overlay__footer, .tablet-overlay__header",
    );

    animatedItems.forEach((el) => {
      el.style.animation = "none";
      el.offsetHeight;
      el.style.animation = "";
    });

    dialog.addEventListener(
      "transitionend",
      () => {
        dialog.close();
      },
      { once: true },
    );

    document.body.classList.remove("no-scroll");
  }

  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  dialog.addEventListener("close", () => {
    document.body.classList.remove("no-scroll");
  });
}
