export function initFooter() {
  const footer = document.querySelector(".footer");
  if (!footer) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footer.classList.add("footer--visible");
          obs.unobserve(footer);
        }
      });
    },
    { threshold: 0.1 },
  );

  observer.observe(footer);
}
