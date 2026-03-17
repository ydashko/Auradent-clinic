export function initTeam() {
  const section = document.querySelector(".team");

  if (!section) return;

  initToggle(section);
  initSliders(section);
}

function initToggle(section) {
  section.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-toggle");
    if (!btn) return;

    const more = document.getElementById(btn.getAttribute("aria-controls"));
    if (!more) return;

    const expanded = btn.getAttribute("aria-expanded") === "true";

    btn.setAttribute("aria-expanded", String(!expanded));
    btn.textContent = expanded ? "Дізнатись більше" : "Згорнути";

    more.hidden = expanded;

    if (!expanded) {
      more.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

export function initSliders() {
  const sliders = document.querySelectorAll(".slider");

  if (!sliders.length) return;

  sliders.forEach((slider) => {
    const track = slider.querySelector(".slides");
    const prev = slider.querySelector(".slide-btn.prev");
    const next = slider.querySelector(".slide-btn.next");

    if (!track || !prev || !next) return;

    const getScrollAmount = () => {
      const slide = track.querySelector(".slide");
      const gap = parseFloat(getComputedStyle(track).gap) || 16;

      return slide
        ? slide.getBoundingClientRect().width + gap
        : track.clientWidth;
    };

    prev.addEventListener("click", () => {
      track.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    });

    next.addEventListener("click", () => {
      track.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    });
  });
}
