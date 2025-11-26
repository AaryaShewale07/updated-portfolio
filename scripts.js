// ---------------------------
// Mobile nav toggle
// ---------------------------
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Close nav on link click (mobile)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// ---------------------------
// Active link on scroll
// ---------------------------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function onScroll() {
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const active = document.querySelector(`.nav a[href="#${id}"]`);
      if (active) active.classList.add("active");
    }
  });
}

window.addEventListener("scroll", onScroll);

// ---------------------------
// Dynamic year
// ---------------------------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------------------------
// Floating Particles
// ---------------------------
function createParticles() {
  const particlesContainer = document.querySelector(".particles");
  const count = 35;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.classList.add("particle");

    const size = Math.random() * 6 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 5;

    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    particlesContainer.appendChild(particle);
  }
}

createParticles();

// ---------------------------
// Floating Bubbles BG
// ---------------------------
function createBubbles() {
  const bubblesContainer = document.createElement("div");
  bubblesContainer.classList.add("bubbles-container");
  document.body.prepend(bubblesContainer);

  const count = 20;

  for (let i = 0; i < count; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = Math.random() * 140 + 40;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 15 + 10;
    bubble.style.animationDuration = `${duration}s`;

    const delay = Math.random() * 10;
    bubble.style.animationDelay = `${delay}s`;

    const drift = (Math.random() - 0.5) * 200;
    bubble.style.setProperty("--drift", `${drift}px`);

    bubblesContainer.appendChild(bubble);
  }
}

createBubbles();

// ---------------------------
// Scroll Animations
// ---------------------------
function initScrollAnimations() {
  const animateSelectors = [
    ".about-block",
    ".skill-card",
    ".project-card",
    ".case-card",
    ".contact-block",
    ".contact-form",
    ".section-header",
  ];

  animateSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add("scroll-animate");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll(".scroll-animate").forEach((el) => {
    observer.observe(el);
  });
}

function addStaggeredDelays() {
  document.querySelectorAll(".about-block").forEach((block, i) =>
    block.classList.add(`stagger-${i + 1}`)
  );

  document.querySelectorAll(".skill-card").forEach((card, i) =>
    card.classList.add(`stagger-${(i % 4) + 1}`)
  );

  document.querySelectorAll(".project-card").forEach((card, i) =>
    card.classList.add(`stagger-${(i % 2) + 1}`)
  );

  document.querySelectorAll(".case-card").forEach((card, i) =>
    card.classList.add(`stagger-${(i % 3) + 1}`)
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    addStaggeredDelays();
  });
} else {
  initScrollAnimations();
  addStaggeredDelays();
}

// ---------------------------
// Smooth Scroll Nav
// ---------------------------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ---------------------------
// Pulse Animation – Hero Tag
// ---------------------------
const heroTag = document.querySelector(".hero-card .tag");
if (heroTag) {
  setInterval(() => {
    heroTag.style.animation = "none";
    setTimeout(() => {
      heroTag.style.animation = "pulse 2s ease-in-out";
    }, 10);
  }, 4000);
}

// Inject CSS for pulse
const style = document.createElement("style");
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.9; }
  }
`;
document.head.appendChild(style);

// ---------------------------
// EMAILJS FUNCTIONAL FORM
// ---------------------------

// Load EmailJS
emailjs.init("-2BdvAivHRfOcnwJx"); // <-- Replace

const form = document.querySelector(".contact-form");
const statusMsg = document.getElementById("formStatus");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const params = {
    user_name: document.getElementById("name").value,
    user_email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("service_ethno1c", "template_449n43j", params) // <-- Replace
    .then(() => {
      statusMsg.textContent = "Message sent successfully 🎉";
      statusMsg.className = "form-status success";
      form.reset();
    })
    .catch((err) => {
      statusMsg.textContent = "Failed to send message. Try again.";
      statusMsg.className = "form-status error";
      form.classList.add("error-shake");
      setTimeout(() => form.classList.remove("error-shake"), 300);
    });
});
