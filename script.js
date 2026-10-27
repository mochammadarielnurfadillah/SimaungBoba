const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const orderForm = document.querySelector("#order-form");
const drinkChoice = document.querySelector("#drink-choice");
const formStatus = document.querySelector("#form-status");
const whatsappNumber = "6288294556836";

function closeMenu() {
  navMenu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu navigasi");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
  navMenu.classList.toggle("is-open", isOpen);
});

navMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});

document.addEventListener("click", (event) => {
  if (menuToggle.getAttribute("aria-expanded") === "true" &&
      !navMenu.contains(event.target) &&
      !menuToggle.contains(event.target)) {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});

document.querySelectorAll(".order-product").forEach((button) => {
  button.addEventListener("click", () => {
    drinkChoice.value = button.dataset.menu;
    document.querySelector("#pesan").scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => document.querySelector("#customer-name").focus({ preventScroll: true }), 450);
  });
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";

  if (!orderForm.reportValidity()) return;

  const formData = new FormData(orderForm);
  const name = String(formData.get("name")).trim();
  const drink = String(formData.get("drink"));
  const quantity = Number(formData.get("quantity"));
  const note = String(formData.get("note")).trim();

  if (!name || !drink || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    formStatus.textContent = "Periksa kembali nama, menu, dan jumlah pesanan.";
    return;
  }

  const message = [
    "Halo Maung Boba, saya ingin memesan:",
    `Nama: ${name}`,
    `Menu: ${drink}`,
    `Jumlah: ${quantity}`,
    ...(note ? [`Catatan: ${note}`] : [])
  ].join("\n");

  window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("js-enabled");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
