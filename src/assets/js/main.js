const Turbolinks = require('turbolinks');
const drawer = require('./drawer');
const darkMode = require('./dark-mode');

// Initialize Turbolinks
Turbolinks.start();

// Initialize mobile nav drawer
drawer();

// Initialize dark mode toggle
const { enableThemeSwitch } = document.documentElement.dataset;

if (enableThemeSwitch) {
  darkMode();
}

// Handle Netlify Identity Login
if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', (user) => {
    if (!user) {
      window.netlifyIdentity.on('login', () => {
        document.location.href = '/admin/';
      });
    }
  });
}
document.body.addEventListener("pointermove", (e) => {
  const { currentTarget: el, clientX: x, clientY: y } = e;
  const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
  el.style.setProperty('--posX', x - l - w / 2);
  el.style.setProperty('--posY', y - t - h / 2);
})