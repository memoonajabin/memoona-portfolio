
const OWNER_EMAIL = "memonajabin786@gmail.com";

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Calligraphy gallery ----------
// The list of works lives in content.js

const galleryGrid = document.getElementById("gallery-grid");
if (galleryGrid) {
  if (calligraphyWorks.length === 0) {
    galleryGrid.innerHTML =
      '<p class="gallery-empty">Gallery coming soon. Message me to see samples of my work.</p>';
  } else {
    calligraphyWorks.forEach((work) => {
      const fig = document.createElement("figure");
      const img = document.createElement("img");
      img.src = work.src;
      img.alt = work.title;
      img.loading = "lazy";
      const cap = document.createElement("figcaption");
      cap.textContent = work.title;
      fig.append(img, cap);
      galleryGrid.appendChild(fig);
    });
  }
}

// ---------- Client reviews ----------
// The reviews live in content.js. A section with no reviews stays hidden.

document.querySelectorAll("[data-reviews]").forEach((section) => {
  const list = reviews[section.dataset.reviews] || [];
  const box = section.querySelector(".reviews");
  if (!box || list.length === 0) return;

  list.forEach((r) => {
    const card = document.createElement("blockquote");
    card.className = "review";
    const p = document.createElement("p");
    p.textContent = r.text;
    const who = document.createElement("footer");
    who.textContent = r.name;
    card.append(p, who);
    box.appendChild(card);
  });
  section.hidden = false;
});

// ---------- Order form: opens the email app with the request filled in ----------
const orderForm = document.getElementById("order-form");
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(orderForm);
    const lines = [];
    data.forEach((value, key) => {
      if (String(value).trim()) lines.push(key + ": " + value);
    });
    const subject = orderForm.dataset.subject || "New order";
    window.location.href =
      "mailto:" + OWNER_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
  });
}

// Fade sections in as they scroll into view
const items = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => observer.observe(el));
} else {
  items.forEach((el) => el.classList.add("visible"));
}