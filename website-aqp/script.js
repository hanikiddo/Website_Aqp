// Configuration
const defaultConfig = {
  hero_slogan: "Kesihatan Anda, Keutamaan Kami",
  about_title: "Profil Kami Farmasi Al Qanaah",
  membership_title: "Keahlian & Ganjaran",
  background_color: "#ffffff",
  surface_color: "#f9fafb",
  text_color: "#064e3b",
  primary_action_color: "#047857",
  secondary_action_color: "#d97706",
  font_family: "Playfair Display",
  font_size: 16
};

// Apply configuration to page
function applyConfig(config) {
  const el = (id) => document.getElementById(id);
  if (el('hero-slogan')) el('hero-slogan').textContent = config.hero_slogan || defaultConfig.hero_slogan;
  if (el('about-title')) el('about-title').textContent = config.about_title || defaultConfig.about_title;
  if (el('membership-title')) el('membership-title').textContent = config.membership_title || defaultConfig.membership_title;

  const font = config.font_family || defaultConfig.font_family;
  document.querySelectorAll('.font-display').forEach(e => e.style.fontFamily = `${font}, serif`);

  const size = config.font_size || defaultConfig.font_size;
  document.body.style.fontSize = `${size}px`;
}

// Initialize Element SDK
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => applyConfig(config),
    mapToCapabilities: (config) => ({
      recolorables: [
        { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
        { get: () => config.surface_color || defaultConfig.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); } },
        { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
        { get: () => config.primary_action_color || defaultConfig.primary_action_color, set: (v) => { config.primary_action_color = v; window.elementSdk.setConfig({ primary_action_color: v }); } },
        { get: () => config.secondary_action_color || defaultConfig.secondary_action_color, set: (v) => { config.secondary_action_color = v; window.elementSdk.setConfig({ secondary_action_color: v }); } }
      ],
      borderables: [],
      fontEditable: { get: () => config.font_family || defaultConfig.font_family, set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); } },
      fontSizeable: { get: () => config.font_size || defaultConfig.font_size, set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); } }
    }),
    mapToEditPanelValues: (config) => new Map([
      ["hero_slogan", config.hero_slogan || defaultConfig.hero_slogan],
      ["about_title", config.about_title || defaultConfig.about_title],
      ["membership_title", config.membership_title || defaultConfig.membership_title]
    ])
  });
} else {
  applyConfig(defaultConfig);
}

// Initialize Lucide icons
if (window.lucide) lucide.createIcons();

const mobileMenuButton = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
