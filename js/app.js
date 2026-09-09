let selectedLang = 'en-IN';

const languages = [
  { code: 'hi-IN', name: 'हिंदी', label: 'Hindi' },
  { code: 'bn-IN', name: 'বাংলা', label: 'Bengali' },
  { code: 'te-IN', name: 'తెలుగు', label: 'Telugu' },
  { code: 'mr-IN', name: 'मराठी', label: 'Marathi' },
  { code: 'ta-IN', name: 'தமிழ்', label: 'Tamil' },
  { code: 'gu-IN', name: 'ગુજરાતી', label: 'Gujarati' },
  { code: 'kn-IN', name: 'ಕನ್ನಡ', label: 'Kannada' },
  { code: 'ml-IN', name: 'മലയാളം', label: 'Malayalam' },
  { code: 'pa-IN', name: 'ਪੰਜਾਬੀ', label: 'Punjabi' },
  { code: 'or-IN', name: 'ଓଡ଼ିଆ', label: 'Odia' },
  { code: 'as-IN', name: 'অসমীয়া', label: 'Assamese' },
  { code: 'en-IN', name: 'English', label: 'English' }
];

// Initialize language grid on page load
window.addEventListener('DOMContentLoaded', () => {
  renderLanguageGrid();
});

function renderLanguageGrid() {
  const grid = document.getElementById('languageGrid');
  if (!grid) return;
  grid.innerHTML = '';
  
  languages.forEach(lang => {
    const chip = document.createElement('div');
    chip.className = `lang-chip ${lang.code === selectedLang ? 'active' : ''}`;
    chip.innerHTML = `<div style="font-size:0.95rem; font-weight:bold;">${lang.name}</div><div style="font-size:0.6rem; opacity:0.8;">${lang.label}</div>`;
    chip.onclick = () => {
      selectedLang = lang.code;
      document.querySelectorAll('.lang-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    };
    grid.appendChild(chip);
  });
}

function startAppFromWelcome() {
  document.getElementById('screenWelcome').classList.add('hidden');
  document.getElementById('screenLanguage').classList.remove('hidden');
  renderLanguageGrid();
}

function confirmLanguageSelection() {
  document.getElementById('screenLanguage').classList.add('hidden');
  document.getElementById('screenPortalSelect').classList.remove('hidden');
}

// DIRECT PORTAL ENTRY (No Sign-In Screen)
function openAuthForRole(role) {
  // Hide Portal Selection Overlay
  document.getElementById('screenPortalSelect').classList.add('hidden');

  if (role === 'seller') {
    document.getElementById('sellerPortal').classList.add('active');
    document.getElementById('buyerPortal').classList.remove('active');
  } else {
    document.getElementById('buyerPortal').classList.add('active');
    document.getElementById('sellerPortal').classList.remove('active');
    if (typeof renderBuyerStore === 'function') {
      renderBuyerStore();
    }
  }
}

function signOut() {
  document.getElementById('sellerPortal').classList.remove('active');
  document.getElementById('buyerPortal').classList.remove('active');
  document.getElementById('screenPortalSelect').classList.add('hidden');
  document.getElementById('screenLanguage').classList.add('hidden');
  document.getElementById('screenWelcome').classList.remove('hidden');
}

function switchSellerPage(pageId) {
  document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}