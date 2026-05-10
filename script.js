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

// Active nav highlight
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const setActiveNav = (id) => {
  navItems.forEach((a) => {
    const isMatch = a.getAttribute("href") === `#${id}`;
    a.classList.toggle("active", isMatch);
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveNav(entry.target.id);
    });
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
);

sections.forEach((s) => sectionObserver.observe(s));

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
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=kanwaljotsingh07@gmail.com&su=${subject}&body=${body}`;

  window.open(gmailUrl, "_blank", "noreferrer");
  form.reset();
  formNote.textContent = "Opening Gmail to send your message...";
  setTimeout(() => { formNote.textContent = ""; }, 4000);
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
