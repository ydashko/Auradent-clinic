// export function initMenu() {
//   const dialog = document.querySelector(".tablet-overlay");
//   const openBtn = document.querySelector(".burger-button");
//   const closeBtn = document.querySelector(".cross-button");

//   if (!dialog || !openBtn || !closeBtn) return;

//   openBtn.addEventListener("click", () => {
//     dialog.showModal();
//     document.body.classList.add("no-scroll");
//   });

//   closeBtn.addEventListener("click", () => {
//     dialog.close();
//     document.body.classList.remove("no-scroll");
//   });

//   dialog.addEventListener("close", () => {
//     document.body.classList.remove("no-scroll");
//   });
// }

export function initMenu() {
  const dialog = document.querySelector(".tablet-overlay");
  const openBtn = document.querySelector(".burger-button");
  const closeBtn = document.querySelector(".cross-button");

  if (!dialog || !openBtn || !closeBtn) return;

  function openMenu() {
    dialog.showModal();
    dialog.classList.add("is-open");
    document.body.classList.add("no-scroll");
  }

  function closeMenu() {
    dialog.close();
    document.body.classList.remove("no-scroll");

    dialog.addEventListener("transitionend", () => dialog.close(), {
      once: true,
    });
    document.body.classList.remove("no-scroll");
  }

  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  dialog.addEventListener("close", () => {
    document.body.classList.remove("no-scroll");
  });
}
