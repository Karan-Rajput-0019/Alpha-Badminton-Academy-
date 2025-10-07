// 🔐 LOGIN LOGIC
document.getElementById('signin-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const role = document.getElementById('role').value;
  const remember = document.getElementById('rememberMe')?.checked;

  if (remember) {
    localStorage.setItem("role", role);
  } else {
    sessionStorage.setItem("role", role);
  }

  if (role === 'player') {
    window.location.href = 'dashboard.html';
  } else {
    window.location.href = 'coach-dashboard.html';
  }
});

// 🆕 SIGN UP REDIRECT
document.getElementById('signup-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  window.location.href = "signup-success.html";
});

// 🚪 LOGOUT
document.getElementById('logout-btn')?.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem("role");
  sessionStorage.removeItem("role");
  window.location.href = "login.html";
});

// 🛡️ ROLE GUARDS
const role = localStorage.getItem("role") || sessionStorage.getItem("role");
if (location.pathname.includes("dashboard.html") && role !== "player") {
  window.location.href = "login.html";
}
if (location.pathname.includes("coach-dashboard.html") && role !== "coach") {
  window.location.href = "login.html";
}

// 🔁 FORGOT PASSWORD
document.getElementById('forgot-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('resetEmail').value.trim();
  if (email) {
    alert(`If ${email} is registered, a reset link has been sent.`);
    window.location.href = "login.html";
  }
});

// 🔁 RESET PASSWORD
document.getElementById('reset-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPass = document.getElementById('newPass').value;
  const confirmPass = document.getElementById('confirmPass').value;

  if (newPass === confirmPass) {
    window.location.href = "reset-success.html";
  } else {
    alert("Passwords do not match.");
  }
});

// 🎯 COACH DASHBOARD TOUR
const coachTourSteps = [
  { selector: ".grid-3", title: "Overview Cards", text: "Quick stats: players, sessions, tournaments." },
  { selector: ".player-table", title: "Player Management", text: "View and manage players here." },
  { selector: ".card:nth-of-type(2)", title: "Schedule Manager", text: "Add or edit training sessions." },
  { selector: ".card:nth-of-type(3)", title: "Tournament Manager", text: "Create and manage tournaments." },
  { selector: ".card:nth-of-type(4)", title: "Announcements", text: "Post updates for all players." },
  { selector: ".welcome-card", title: "All Set!", text: "You’re ready to manage your academy." }
];

let coachStep = 0;
const overlay = document.getElementById("tour-overlay");
const tooltip = document.getElementById("tour-tooltip");
const title = document.getElementById("tour-title");
const text = document.getElementById("tour-text");
const nextBtn = document.getElementById("tour-next");
const prevBtn = document.getElementById("tour-prev");

function startCoachTour() {
  overlay?.classList.remove("hidden");
  tooltip?.classList.remove("hidden");
  showCoachStep();
}

function showCoachStep() {
  const step = coachTourSteps[coachStep];
  const element = document.querySelector(step.selector);
  if (!element) return;

  const rect = element.getBoundingClientRect();
  tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
  tooltip.style.left = `${rect.left + window.scrollX}px`;

  title.textContent = step.title;
  text.textContent = step.text;

  prevBtn.style.display = coachStep === 0 ? "none" : "inline-block";
  nextBtn.textContent = coachStep === coachTourSteps.length - 1 ? "Finish" : "Next";

  element.style.outline = "3px solid var(--accent)";
  element.scrollIntoView({ behavior: "smooth", block: "center" });
}

nextBtn?.addEventListener("click", () => {
  document.querySelector(coachTourSteps[coachStep].selector).style.outline = "none";
  if (coachStep < coachTourSteps.length - 1) {
    coachStep++;
    showCoachStep();
  } else {
    endCoachTour();
  }
});

prevBtn?.addEventListener("click", () => {
  document.querySelector(coachTourSteps[coachStep].selector).style.outline = "none";
  if (coachStep > 0) {
    coachStep--;
    showCoachStep();
  }
});

function endCoachTour() {
  overlay?.classList.add("hidden");
  tooltip?.classList.add("hidden");
  document.querySelector(coachTourSteps[coachStep].selector).style.outline = "none";
  localStorage.setItem("coachTourCompleted", "true");
}

if (!localStorage.getItem("coachTourCompleted") && location.pathname.includes("coach-dashboard.html")) {
  startCoachTour();
}