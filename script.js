// Add your verified company email below to activate enquiry emails.
 const VELORA_CONTACT_EMAIL = "veloraglobalf@gmail.com";

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  if (menuButton) menuButton.textContent = "☰";
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("enquiry-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const note = document.getElementById("form-note");
  if (!VELORA_CONTACT_EMAIL) {
    note.textContent = "The form is ready, but Velora's verified business email has not been added yet. Send us your business email so this form can be connected.";
    note.scrollIntoView({behavior:"smooth", block:"center"});
    return;
  }
  const subject = encodeURIComponent("Product enquiry — Velora Global Foods");
  const body = encodeURIComponent(
`Name: ${form.get("name")}
Company: ${form.get("company")}
Email: ${form.get("email")}
Destination country: ${form.get("country")}
Product: ${form.get("product")}

Requirements:
${form.get("message")}`
  );
  window.location.href = `mailto:${VELORA_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});
