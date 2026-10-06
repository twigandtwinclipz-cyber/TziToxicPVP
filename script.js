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
const languageSelect = document.querySelector("#language-select");

let authMode = "login";
let currentLanguage = "en";

const translations = {
  en: {
    "page.title": "TziToxicPVP — Enter the arena",
    "page.description": "Enter TziToxicPVP: a Minecraft PvP server built for players who come to fight.",
    "nav.home": "TziToxicPVP home", "nav.toggle": "Toggle navigation", "nav.label": "Main navigation",
    "nav.server": "The server", "nav.join": "How to join", "nav.faq": "FAQ", "nav.login": "Player login",
    "language.label": "Choose language",
    "hero.kicker": "YOUR NEXT FIGHT STARTS HERE", "hero.title": "BUILT TO<br>FIGHT<span class=\"heading-period\">.</span><br><span class=\"heading-outline\">MADE TO WIN.</span>",
    "hero.description": "Sharpen your aim. Trust your instincts. Step into the arena and make every hit count.",
    "hero.cta": "ENTER THE ARENA", "hero.login": "PLAYER LOGIN", "hero.note": "NO SHORTCUTS. JUST SKILL.",
    "hero.artLabel": "Illustration of a Minecraft-style PvP arena", "hero.combat": "COMBAT MODE", "hero.on": "ON",
    "hero.arena": "ARENA_01", "hero.ready": "READY", "ticker.label": "Server motto",
    "ticker.smart": "FIGHT SMART", "ticker.win": "CLAIM YOUR WIN",
    "about.kicker": "THE SERVER", "about.title": "THIS ISN'T A<br><span>SAFE ZONE.</span>",
    "about.description": "TziToxicPVP is a Minecraft PvP server for players who'd rather prove it in the arena. Load in, find your fight, and leave your mark.",
    "about.link": "FIND YOUR WAY IN",
    "feature.one.title": "PURE PVP", "feature.one.description": "Read the fight. Make your move. Earn every win.",
    "feature.two.title": "YOUR MOMENT", "feature.two.description": "Step into the arena and make a name for yourself.",
    "feature.three.title": "YOUR PEOPLE", "feature.three.description": "Meet other players and find your next challenge.",
    "join.kicker": "GET IN THE GAME", "join.title": "READY WHEN<br><span>YOU ARE.</span>",
    "join.address": "SERVER ADDRESS", "join.description": "Connect with Minecraft Java Edition using Fabric 26.2.",
    "join.profile": "MAKE A PLAYER PROFILE", "join.footnote": "Join with Fabric 26.2 · Java Edition",
    "faq.kicker": "QUICK ANSWERS", "faq.title": "BEFORE<br>YOU <span>QUEUE.</span>",
    "faq.one.question": "What is TziToxicPVP?",
    "faq.one.answer": "TziToxicPVP is a Minecraft server focused on player-versus-player combat. More server details will be shared here soon.",
    "faq.two.question": "How do I join the server?", "faq.two.answer": "Use Fabric 26.2 and type \"TziToxicPVP.mc.gg\"!",
    "faq.three.question": "What is the player login for?",
    "faq.three.answer": "The profile form on this preview is for trying the website interface. It does not create a real account or authenticate you with a Minecraft server.",
    "footer.disclaimer": "NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.",
    "footer.top": "BACK TO TOP ↑",
    "auth.close": "Close login dialog", "auth.access": "PLAYER ACCESS", "auth.tabs": "Account access",
    "auth.login": "LOG IN", "auth.signup": "SIGN UP", "auth.username": "MINECRAFT USERNAME",
    "auth.usernamePlaceholder": "Your in-game name", "auth.password": "PASSWORD",
    "auth.passwordPlaceholder": "At least 8 characters",
    "auth.notice": "Website preview only. GitHub Pages cannot securely create accounts; connect an authentication provider before using real credentials.",
    "auth.previewAs": "You are viewing the site as",
    "auth.previewNotice": "This is a temporary preview session only. No password was saved or checked.",
    "auth.logout": "LOG OUT", "auth.loginTitle": "YOUR NEXT<br><span>MOVE.</span>",
    "auth.signupTitle": "CLAIM YOUR<br><span>NAME.</span>", "auth.create": "CREATE PREVIEW PROFILE",
    "auth.invalidUsername": "Use a Minecraft username with 3–16 letters, numbers, or underscores."
  },
  fr: {
    "page.title": "TziToxicPVP — Entre dans l’arène",
    "page.description": "Rejoins TziToxicPVP, un serveur Minecraft PvP pour les joueurs prêts à se battre.",
    "nav.home": "Accueil TziToxicPVP", "nav.toggle": "Afficher ou masquer la navigation",
    "nav.label": "Navigation principale", "nav.server": "Le serveur", "nav.join": "Comment rejoindre",
    "nav.faq": "FAQ", "nav.login": "Connexion joueur", "language.label": "Choisir la langue",
    "hero.kicker": "TON PROCHAIN COMBAT COMMENCE ICI",
    "hero.title": "NÉ POUR<br>COMBATTRE<span class=\"heading-period\">.</span><br><span class=\"heading-outline\">FAIT POUR GAGNER.</span>",
    "hero.description": "Aiguise ta visée. Fais confiance à ton instinct. Entre dans l’arène et fais compter chaque coup.",
    "hero.cta": "ENTRER DANS L’ARÈNE", "hero.login": "CONNEXION JOUEUR",
    "hero.note": "PAS DE RACCOURCI. QUE DU TALENT.",
    "hero.artLabel": "Illustration d’une arène PvP de style Minecraft", "hero.combat": "MODE COMBAT",
    "hero.on": "ACTIF", "hero.arena": "ARÈNE_01", "hero.ready": "PRÊT",
    "ticker.label": "Devise du serveur", "ticker.smart": "COMBATS AVEC ASTUCE",
    "ticker.win": "DÉCROCHE TA VICTOIRE",
    "about.kicker": "LE SERVEUR", "about.title": "CE N’EST PAS UNE<br><span>ZONE SÛRE.</span>",
    "about.description": "TziToxicPVP est un serveur Minecraft PvP pour celles et ceux qui préfèrent faire leurs preuves dans l’arène. Connecte-toi, trouve ton combat et marque les esprits.",
    "about.link": "TROUVE TON CHEMIN",
    "feature.one.title": "PVP PUR", "feature.one.description": "Lis le combat. Passe à l’action. Mérite chaque victoire.",
    "feature.two.title": "À TOI DE JOUER", "feature.two.description": "Entre dans l’arène et fais-toi un nom.",
    "feature.three.title": "TON ÉQUIPE", "feature.three.description": "Rencontre d’autres joueurs et relève ton prochain défi.",
    "join.kicker": "ENTRE DANS LE JEU", "join.title": "L’ARÈNE<br><span>T’ATTEND.</span>",
    "join.address": "ADRESSE DU SERVEUR",
    "join.description": "Connecte-toi avec Minecraft Java Edition et Fabric 26.2.",
    "join.profile": "CRÉER UN PROFIL JOUEUR", "join.footnote": "Fabric 26.2 · Java Edition",
    "faq.kicker": "RÉPONSES RAPIDES", "faq.title": "AVANT DE<br><span>COMBATTRE.</span>",
    "faq.one.question": "Qu’est-ce que TziToxicPVP ?",
    "faq.one.answer": "TziToxicPVP est un serveur Minecraft axé sur les combats joueur contre joueur. Plus de détails sur le serveur seront bientôt publiés.",
    "faq.two.question": "Comment rejoindre le serveur ?",
    "faq.two.answer": "Utilise Fabric 26.2 et saisis « TziToxicPVP.mc.gg » !",
    "faq.three.question": "À quoi sert la connexion joueur ?",
    "faq.three.answer": "Le formulaire de profil de cette démo sert à tester l’interface du site. Il ne crée pas de vrai compte et ne t’authentifie pas sur un serveur Minecraft.",
    "footer.disclaimer": "CE PRODUIT N’EST PAS UN PRODUIT OFFICIEL MINECRAFT. IL N’EST NI APPROUVÉ NI ASSOCIÉ À MOJANG OU MICROSOFT.",
    "footer.top": "RETOUR EN HAUT ↑",
    "auth.close": "Fermer la fenêtre de connexion", "auth.access": "ACCÈS JOUEUR",
    "auth.tabs": "Accès au compte", "auth.login": "SE CONNECTER", "auth.signup": "S’INSCRIRE",
    "auth.username": "PSEUDONYME MINECRAFT", "auth.usernamePlaceholder": "Ton nom en jeu",
    "auth.password": "MOT DE PASSE", "auth.passwordPlaceholder": "8 caractères minimum",
    "auth.notice": "Aperçu du site uniquement. GitHub Pages ne peut pas créer de comptes de façon sécurisée ; connecte un fournisseur d’authentification avant d’utiliser de vrais identifiants.",
    "auth.previewAs": "Tu consultes le site en tant que",
    "auth.previewNotice": "Cette session est temporaire et réservée à l’aperçu. Aucun mot de passe n’a été enregistré ni vérifié.",
    "auth.logout": "SE DÉCONNECTER", "auth.loginTitle": "À TOI DE<br><span>JOUER.</span>",
    "auth.signupTitle": "RÉSERVE TON<br><span>PSEUDO.</span>", "auth.create": "CRÉER UN PROFIL DE DÉMO",
    "auth.invalidUsername": "Utilise un pseudo Minecraft de 3 à 16 lettres, chiffres ou tirets bas."
  },
  es: {
    "page.title": "TziToxicPVP — Entra en la arena",
    "page.description": "Entra en TziToxicPVP, un servidor Minecraft PvP para quienes vienen a luchar.",
    "nav.home": "Inicio de TziToxicPVP", "nav.toggle": "Mostrar u ocultar navegación",
    "nav.label": "Navegación principal", "nav.server": "El servidor", "nav.join": "Cómo unirse",
    "nav.faq": "Preguntas frecuentes", "nav.login": "Acceso de jugador", "language.label": "Elegir idioma",
    "hero.kicker": "TU PRÓXIMO COMBATE EMPIEZA AQUÍ",
    "hero.title": "NACIDO PARA<br>LUCHAR<span class=\"heading-period\">.</span><br><span class=\"heading-outline\">HECHO PARA GANAR.</span>",
    "hero.description": "Afina tu puntería. Confía en tu instinto. Entra en la arena y haz que cada golpe cuente.",
    "hero.cta": "ENTRA EN LA ARENA", "hero.login": "ACCESO DE JUGADOR",
    "hero.note": "SIN ATAJOS. SOLO HABILIDAD.",
    "hero.artLabel": "Ilustración de una arena PvP de estilo Minecraft", "hero.combat": "MODO COMBATE",
    "hero.on": "ACTIVO", "hero.arena": "ARENA_01", "hero.ready": "LISTO",
    "ticker.label": "Lema del servidor", "ticker.smart": "LUCHA CON ASTUCIA",
    "ticker.win": "CONQUISTA LA VICTORIA",
    "about.kicker": "EL SERVIDOR", "about.title": "ESTO NO ES UNA<br><span>ZONA SEGURA.</span>",
    "about.description": "TziToxicPVP es un servidor Minecraft PvP para quienes prefieren demostrar lo que valen en la arena. Entra, encuentra tu combate y deja huella.",
    "about.link": "DESCUBRE CÓMO ENTRAR",
    "feature.one.title": "PVP PURO", "feature.one.description": "Lee el combate. Haz tu jugada. Gánate cada victoria.",
    "feature.two.title": "TU MOMENTO", "feature.two.description": "Entra en la arena y hazte un nombre.",
    "feature.three.title": "TU GENTE", "feature.three.description": "Conoce a otros jugadores y encuentra tu próximo reto.",
    "join.kicker": "ENTRA EN EL JUEGO", "join.title": "LA ARENA<br><span>TE ESPERA.</span>",
    "join.address": "DIRECCIÓN DEL SERVIDOR",
    "join.description": "Conéctate con Minecraft Java Edition y Fabric 26.2.",
    "join.profile": "CREAR PERFIL DE JUGADOR", "join.footnote": "Fabric 26.2 · Java Edition",
    "faq.kicker": "RESPUESTAS RÁPIDAS", "faq.title": "ANTES DE<br><span>LUCHAR.</span>",
    "faq.one.question": "¿Qué es TziToxicPVP?",
    "faq.one.answer": "TziToxicPVP es un servidor Minecraft centrado en el combate entre jugadores. Pronto compartiremos más detalles del servidor.",
    "faq.two.question": "¿Cómo me uno al servidor?",
    "faq.two.answer": "¡Usa Fabric 26.2 y escribe «TziToxicPVP.mc.gg»!",
    "faq.three.question": "¿Para qué sirve el acceso de jugador?",
    "faq.three.answer": "El formulario de perfil de esta vista previa sirve para probar la interfaz del sitio. No crea una cuenta real ni te autentica en un servidor de Minecraft.",
    "footer.disclaimer": "ESTE NO ES UN PRODUCTO OFICIAL DE MINECRAFT. NO ESTÁ APROBADO NI ASOCIADO CON MOJANG O MICROSOFT.",
    "footer.top": "VOLVER ARRIBA ↑",
    "auth.close": "Cerrar ventana de acceso", "auth.access": "ACCESO DE JUGADOR",
    "auth.tabs": "Acceso a la cuenta", "auth.login": "INICIAR SESIÓN", "auth.signup": "REGISTRARSE",
    "auth.username": "NOMBRE DE MINECRAFT", "auth.usernamePlaceholder": "Tu nombre en el juego",
    "auth.password": "CONTRASEÑA", "auth.passwordPlaceholder": "Al menos 8 caracteres",
    "auth.notice": "Solo es una vista previa del sitio. GitHub Pages no puede crear cuentas de forma segura; conecta un proveedor de autenticación antes de usar credenciales reales.",
    "auth.previewAs": "Estás viendo el sitio como",
    "auth.previewNotice": "Esta sesión de vista previa es temporal. No se guardó ni verificó ninguna contraseña.",
    "auth.logout": "CERRAR SESIÓN", "auth.loginTitle": "TU PRÓXIMA<br><span>JUGADA.</span>",
    "auth.signupTitle": "RESERVA TU<br><span>NOMBRE.</span>", "auth.create": "CREAR PERFIL DE PRUEBA",
    "auth.invalidUsername": "Usa un nombre de Minecraft de 3–16 letras, números o guiones bajos."
  },
  de: {
    "page.title": "TziToxicPVP — Betritt die Arena",
    "page.description": "Tritt TziToxicPVP bei: ein Minecraft-PvP-Server für alle, die kämpfen wollen.",
    "nav.home": "TziToxicPVP-Startseite", "nav.toggle": "Navigation ein- oder ausblenden",
    "nav.label": "Hauptnavigation", "nav.server": "Der Server", "nav.join": "So kommst du rein",
    "nav.faq": "FAQ", "nav.login": "Spieler-Login", "language.label": "Sprache auswählen",
    "hero.kicker": "DEIN NÄCHSTER KAMPF BEGINNT HIER",
    "hero.title": "GEBOREN ZUM<br>KÄMPFEN<span class=\"heading-period\">.</span><br><span class=\"heading-outline\">GEMACHT ZUM SIEGEN.</span>",
    "hero.description": "Trainiere dein Zielen. Vertraue deinem Instinkt. Betritt die Arena und lass jeden Treffer zählen.",
    "hero.cta": "BETRITT DIE ARENA", "hero.login": "SPIELER-LOGIN",
    "hero.note": "KEINE ABKÜRZUNGEN. NUR KÖNNEN.",
    "hero.artLabel": "Illustration einer Minecraft-PvP-Arena", "hero.combat": "KAMPFMODUS",
    "hero.on": "AKTIV", "hero.arena": "ARENA_01", "hero.ready": "BEREIT",
    "ticker.label": "Server-Motto", "ticker.smart": "KÄMPFE MIT KÖPFCHEN",
    "ticker.win": "HOL DIR DEN SIEG",
    "about.kicker": "DER SERVER", "about.title": "DAS IST KEINE<br><span>SICHERE ZONE.</span>",
    "about.description": "TziToxicPVP ist ein Minecraft-PvP-Server für alle, die sich lieber in der Arena beweisen. Logge dich ein, finde deinen Kampf und hinterlasse Eindruck.",
    "about.link": "SO KOMMST DU REIN",
    "feature.one.title": "PURES PVP", "feature.one.description": "Lies den Kampf. Mach deinen Zug. Verdiene jeden Sieg.",
    "feature.two.title": "DEIN MOMENT", "feature.two.description": "Betritt die Arena und mach dir einen Namen.",
    "feature.three.title": "DEINE LEUTE", "feature.three.description": "Lerne andere Spieler kennen und finde deine nächste Herausforderung.",
    "join.kicker": "AB INS SPIEL", "join.title": "DIE ARENA<br><span>WARTET.</span>",
    "join.address": "SERVERADRESSE",
    "join.description": "Verbinde dich mit Minecraft Java Edition und Fabric 26.2.",
    "join.profile": "SPIELERPROFIL ERSTELLEN", "join.footnote": "Fabric 26.2 · Java Edition",
    "faq.kicker": "KURZE ANTWORTEN", "faq.title": "BEVOR DU<br><span>KÄMPFST.</span>",
    "faq.one.question": "Was ist TziToxicPVP?",
    "faq.one.answer": "TziToxicPVP ist ein Minecraft-Server mit Fokus auf Kämpfe zwischen Spielern. Weitere Serverinfos folgen in Kürze.",
    "faq.two.question": "Wie trete ich dem Server bei?",
    "faq.two.answer": "Verwende Fabric 26.2 und gib „TziToxicPVP.mc.gg“ ein!",
    "faq.three.question": "Wofür ist der Spieler-Login?",
    "faq.three.answer": "Das Profilformular in dieser Vorschau dient zum Ausprobieren der Website. Es erstellt kein echtes Konto und meldet dich nicht bei einem Minecraft-Server an.",
    "footer.disclaimer": "DIES IST KEIN OFFIZIELLES MINECRAFT-PRODUKT. ES WIRD WEDER VON MOJANG ODER MICROSOFT GENEHMIGT NOCH MIT IHNEN IN VERBINDUNG GEBRACHT.",
    "footer.top": "NACH OBEN ↑",
    "auth.close": "Login-Dialog schließen", "auth.access": "SPIELERZUGANG",
    "auth.tabs": "Kontozugang", "auth.login": "ANMELDEN", "auth.signup": "REGISTRIEREN",
    "auth.username": "MINECRAFT-BENUTZERNAME", "auth.usernamePlaceholder": "Dein Name im Spiel",
    "auth.password": "PASSWORT", "auth.passwordPlaceholder": "Mindestens 8 Zeichen",
    "auth.notice": "Nur eine Website-Vorschau. GitHub Pages kann keine Konten sicher erstellen. Verbinde einen Authentifizierungsanbieter, bevor du echte Zugangsdaten verwendest.",
    "auth.previewAs": "Du siehst die Website als",
    "auth.previewNotice": "Dies ist nur eine temporäre Vorschau-Sitzung. Es wurde kein Passwort gespeichert oder überprüft.",
    "auth.logout": "ABMELDEN", "auth.loginTitle": "DEIN NÄCHSTER<br><span>ZUG.</span>",
    "auth.signupTitle": "SICHERE DIR<br><span>DEINEN NAMEN.</span>", "auth.create": "VORSCHAU-PROFIL ERSTELLEN",
    "auth.invalidUsername": "Verwende einen Minecraft-Namen mit 3–16 Buchstaben, Zahlen oder Unterstrichen."
  }
};

function applyTranslations(language) {
  const strings = translations[language];
  currentLanguage = language;
  document.documentElement.lang = language;
  document.title = strings["page.title"];

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = strings[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = strings[element.dataset.i18nHtml];
  });
  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(",").forEach((entry) => {
      const [attribute, key] = entry.split(":");
      element.setAttribute(attribute, strings[key]);
    });
  });
  document.querySelector('meta[name="description"]').content = strings["page.description"];
  setAuthMode(authMode);
}

function setAuthMode(mode) {
  authMode = mode;
  const isSignup = mode === "signup";
  document.querySelector("#login-tab").setAttribute("aria-selected", String(!isSignup));
  document.querySelector("#signup-tab").setAttribute("aria-selected", String(isSignup));
  authForm.setAttribute("aria-labelledby", isSignup ? "signup-tab" : "login-tab");
  const strings = translations[currentLanguage];
  authTitle.innerHTML = strings[isSignup ? "auth.signupTitle" : "auth.loginTitle"];
  authSubmit.innerHTML = `${strings[isSignup ? "auth.create" : "auth.login"]} <span aria-hidden="true">→</span>`;
  passwordInput.autocomplete = isSignup ? "new-password" : "current-password";
  authFeedback.textContent = "";
}

const savedLanguage = localStorage.getItem("tzitoxicpvp-language");
const browserLanguage = navigator.language.slice(0, 2).toLowerCase();
const initialLanguage = savedLanguage && Object.prototype.hasOwnProperty.call(translations, savedLanguage)
  ? savedLanguage
  : (Object.prototype.hasOwnProperty.call(translations, browserLanguage) ? browserLanguage : "en");
languageSelect.value = initialLanguage;
applyTranslations(initialLanguage);

languageSelect.addEventListener("change", () => {
  const language = languageSelect.value;
  localStorage.setItem("tzitoxicpvp-language", language);
  applyTranslations(language);
});

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
    authFeedback.textContent = translations[currentLanguage]["auth.invalidUsername"];
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
