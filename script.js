const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const form = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");
const resumeLink = document.querySelector('a[download]');
const themeToggle = document.querySelector(".theme-toggle");
const backTop = document.querySelector(".back-top");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  themeToggle.setAttribute("aria-label", "Switch to dark mode");
  themeToggle.setAttribute("aria-pressed", "true");
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const message = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name: formData.get("name").trim(),
    email: formData.get("email").trim(),
    message: formData.get("message").trim(),
    createdAt: new Date().toISOString()
  };
  const messages = JSON.parse(localStorage.getItem("portfolio-messages") || "[]");
  messages.unshift(message);
  localStorage.setItem("portfolio-messages", JSON.stringify(messages));
  form.reset();
  formNote.textContent = "Thanks! Your message was saved for the admin panel preview.";
});

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-mode");
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  themeToggle.setAttribute("aria-pressed", String(isLight));
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
});

const toggleBackTop = () => {
  backTop.classList.toggle("visible", window.scrollY > 360);
};

window.addEventListener("scroll", toggleBackTop, { passive: true });
toggleBackTop();

backTop.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
