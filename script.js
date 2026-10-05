const authDialog = document.querySelector(".auth-dialog");
const authForm = document.querySelector("#auth-form");
const authFeedback = document.querySelector("#auth-feedback");
const authSubmit = document.querySelector("#auth-submit");
const authTitle = document.querySelector("#auth-title");
const usernameInput = document.querySelector("#player-name");
const passwordInput = document.querySelector("#player-password");
const signedInPanel = document.querySelector(".signed-in");
const signedInName = document.querySelector(".signed-in-name");
const authTabs = [...document.querySelectorAll("[data-auth-mode]")];
const navigation = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");

let authMode = "login";

function setAuthMode(mode) {
  authMode = mode;
  const isSignup = mode === "signup";
  document.querySelector("#login-tab").setAttribute("aria-selected", String(!isSignup));
  document.querySelector("#signup-tab").setAttribute("aria-selected", String(isSignup));
  authForm.setAttribute("aria-labelledby", isSignup ? "signup-tab" : "login-tab");
  authTitle.innerHTML = isSignup ? "CLAIM YOUR<br><span>NAME.</span>" : "YOUR NEXT<br><span>MOVE.</span>";
  authSubmit.innerHTML = `${isSignup ? "CREATE PREVIEW PROFILE" : "LOG IN"} <span aria-hidden="true">→</span>`;
  passwordInput.autocomplete = isSignup ? "new-password" : "current-password";
  authFeedback.textContent = "";
}

function showAuthDialog() {
  if (authDialog.open) return;
  authFeedback.textContent = "";
  const playerName = sessionStorage.getItem("tzitoxicpvp-preview-player");
  authForm.hidden = Boolean(playerName);
  signedInPanel.hidden = !playerName;
  if (playerName) signedInName.textContent = playerName;
  authDialog.showModal();
}

document.querySelectorAll("[data-open-auth]").forEach((button) => {
  button.addEventListener("click", showAuthDialog);
});

document.querySelector(".dialog-close").addEventListener("click", () => authDialog.close());

authDialog.addEventListener("click", (event) => {
  if (event.target === authDialog) authDialog.close();
});

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setAuthMode(tab.dataset.authMode);
    passwordInput.value = "";
  });
});

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!authForm.reportValidity()) return;
  const username = usernameInput.value.trim();
  if (!/^[A-Za-z0-9_]{3,16}$/.test(username)) {
    authFeedback.textContent = "Use a Minecraft username with 3–16 letters, numbers, or underscores.";
    usernameInput.focus();
    return;
  }

  sessionStorage.setItem("tzitoxicpvp-preview-player", username);
  passwordInput.value = "";
  signedInName.textContent = username;
  authForm.hidden = true;
  signedInPanel.hidden = false;
});

document.querySelector(".auth-logout").addEventListener("click", () => {
  sessionStorage.removeItem("tzitoxicpvp-preview-player");
  authForm.reset();
  setAuthMode("login");
  signedInPanel.hidden = true;
  authForm.hidden = false;
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  });
});
