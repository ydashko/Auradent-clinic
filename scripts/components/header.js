export function initHeaderAnimation() {
  const header = document.querySelector(".header");
  if (!header) return;

  window.addEventListener("load", () => {
    header.classList.add("header--animated");
  });
}
