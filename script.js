const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const contactForm = document.querySelector("#contactForm");
const toast = document.querySelector("#toast");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("需求已送出，我們會依照你的階段回覆適合的課程或服務。");
    contactForm.reset();
  });
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2800);
}
