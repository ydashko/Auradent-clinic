export function initSectionAnimation() {
  const sections = document.querySelectorAll(".section");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section--animated");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  sections.forEach((section) => observer.observe(section));
}
