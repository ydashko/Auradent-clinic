// // components/services.js
// export function initServices() {
//   const services = document.querySelectorAll(".service");
//   if (!services.length) return;

//   function closeAll() {
//     services.forEach((item) => {
//       item.classList.remove("is-open", "is-tablet");
//       item.style.backgroundImage = "";
//       const imageBox = item.querySelector(".service__image");
//       if (imageBox) {
//         imageBox.style.backgroundImage = "";
//         imageBox.style.opacity = "";
//         imageBox.style.transform = "";
//       }
//     });
//   }

//   services.forEach((item) => {
//     item.addEventListener("click", function (e) {
//       const width = window.innerWidth;
//       const isMobile = width <= 768;
//       const isTablet = width > 768 && width <= 1024;
//       const isActive =
//         this.classList.contains("is-open") ||
//         this.classList.contains("is-tablet");

//       if (isActive) {
//         closeAll();
//         e.stopPropagation();
//         return;
//       }
//       closeAll();

//       if (isMobile) {
//         this.classList.add("is-open");
//         const bg = this.dataset.bg;
//         if (bg) this.style.backgroundImage = `url(${bg})`;
//       }

//       if (isTablet) {
//         this.classList.add("is-tablet");
//         const bg = this.dataset.bg;
//         const imageBox = this.querySelector(".service__image");
//         if (bg && imageBox) {
//           imageBox.style.backgroundImage = `url(${bg})`;
//           imageBox.style.backgroundSize = "cover";
//           imageBox.style.backgroundPosition = "center";
//           imageBox.style.backgroundRepeat = "no-repeat";
//           imageBox.style.opacity = "1";
//           imageBox.style.transform = "translateX(0)";
//         }
//       }

//       e.stopPropagation();
//     });
//   });

//   document.addEventListener("click", function (e) {
//     if (!e.target.closest(".service")) closeAll();
//   });
// }

// components/services.js
export function initServices() {
  const services = document.querySelectorAll(".service");
  if (!services.length) return;

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

      if (isActive) {
        closeAll();
        e.stopPropagation();
        return;
      }
      closeAll();

      if (isMobile) {
        this.classList.add("is-open");
        const bg = this.dataset.bg;
        const pos = this.dataset.pos || "center center"; // <-- тут добавляем data-pos
        if (bg) {
          this.style.backgroundImage = `url(${bg})`;
          this.style.backgroundPosition = pos; // <-- применяем позицию
          this.style.backgroundSize = "cover";
          this.style.backgroundRepeat = "no-repeat";
        }
      }

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

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".service")) closeAll();
  });
}
