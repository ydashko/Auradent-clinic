// components/faq.js
export function initFaq() {
  document.querySelectorAll(".faq").forEach((faq) => {
    const wrapper = faq.querySelector(".faq__answer-wrapper");
    const icon = faq.querySelector(".faq__icon");
    if (!wrapper) return;

    wrapper.style.maxHeight = "0px";
    wrapper.style.overflow = "hidden";
    wrapper.style.transition = "max-height 0.35s ease, opacity 0.35s ease";
    wrapper.style.opacity = "0";

    faq.addEventListener("toggle", () => {
      if (faq.open) {
        wrapper.style.maxHeight = wrapper.scrollHeight + "px";
        wrapper.style.opacity = "1";
        if (icon) icon.style.transform = "rotate(45deg)";
      } else {
        wrapper.style.maxHeight = wrapper.scrollHeight + "px";
        requestAnimationFrame(() => {
          wrapper.style.maxHeight = "0px";
          wrapper.style.opacity = "0";
          if (icon) icon.style.transform = "rotate(0deg)";
        });
      }
    });
  });
}
