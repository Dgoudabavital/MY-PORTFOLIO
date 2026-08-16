// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

// Scroll reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Contact form validation
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formStatus = document.getElementById("formStatus");

function setError(input, errorId, message) {
  document.getElementById(errorId).textContent = message;
  input.classList.toggle("invalid", Boolean(message));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  let valid = true;
  formStatus.textContent = "";

  setError(nameInput, "nameError", "");
  setError(emailInput, "emailError", "");
  setError(messageInput, "messageError", "");

  if (name.length < 2) {
    setError(nameInput, "nameError", "Please enter your name.");
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setError(emailInput, "emailError", "Please enter a valid email.");
    valid = false;
  }

  if (message.length < 10) {
    setError(messageInput, "messageError", "Message must contain at least 10 characters.");
    valid = false;
  }

  if (!valid) return;

  formStatus.textContent = "Validation successful. Opening your email app...";
  const subject = encodeURIComponent("Portfolio Contact from " + name);
  const body = encodeURIComponent(message + "\n\nReply to: " + email);
  window.location.href =
    "mailto:doddanagouda.bavital@gmail.com?subject=" + subject + "&body=" + body;
});

// Demo project links: prevent empty # links from jumping to top.
document.querySelectorAll(".demo-link").forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Replace this link with the deployed URL of the project.");
  });
});