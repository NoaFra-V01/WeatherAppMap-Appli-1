// src/template.js

const CSS = `
  /* ── CSS Variables (dark theme par défaut) ── */
  :root {
    --bg:          #0f172a;
    --surface:     #1e293b;
    --surface2:    #0f172a;
    --border:      #334155;
    --border-focus:#7dd3fc;
    --text:        #e2e8f0;
    --text-muted:  #64748b;
    --text-sub:    #94a3b8;
    --accent:      #0ea5e9;
    --accent-hover:#38bdf8;
    --title:       #7dd3fc;
    --comment-border: #6d28d9;
    --comment-label:  #a78bfa;
    --comment-text:   #e2e8f0;
    --error-border:   #dc2626;
    --error-title:    #f87171;
    --error-link:     #7dd3fc;
    --toggle-bg:   #1e293b;
    --toggle-border:#475569;
    --shadow: 0 4px 24px rgba(0,0,0,0.35);
  }

  /* ── Light theme overrides ── */
  [data-theme="light"] {
    --bg:          #f1f5f9;
    --surface:     #ffffff;
    --surface2:    #f8fafc;
    --border:      #e2e8f0;
    --border-focus:#0ea5e9;
    --text:        #0f172a;
    --text-muted:  #94a3b8;
    --text-sub:    #64748b;
    --accent:      #0284c7;
    --accent-hover:#0369a1;
    --title:       #0284c7;
    --comment-border: #7c3aed;
    --comment-label:  #7c3aed;
    --comment-text:   #1e293b;
    --error-border:   #ef4444;
    --error-title:    #dc2626;
    --error-link:     #0284c7;
    --toggle-bg:   #ffffff;
    --toggle-border:#cbd5e1;
    --shadow: 0 4px 24px rgba(0,0,0,0.08);
  }

  /* ── Base ── */
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem 3rem;
    transition: background 0.25s, color 0.25s;
  }

  /* ── Header row ── */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
    margin-bottom: 2rem;
  }

  .app-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--title);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* ── Theme toggle ── */
  .theme-toggle {
    background: var(--toggle-bg);
    border: 1px solid var(--toggle-border);
    border-radius: 2rem;
    padding: 0.35rem 0.8rem;
    cursor: pointer;
    font-size: 1.1rem;
    line-height: 1;
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--text-sub);
    font-size: 0.8rem;
    font-weight: 600;
  }
  .theme-toggle:hover { border-color: var(--border-focus); transform: scale(1.05); }
  .theme-toggle .icon { font-size: 1.1rem; }

  /* ── Card ── */
  .card {
    background: var(--surface);
    border-radius: 1.1rem;
    padding: 1.5rem;
    width: 100%;
    max-width: 600px;
    margin-bottom: 1rem;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    transition: background 0.25s, border-color 0.25s, box-shadow 0.25s;
  }

  /* ── Search form ── */
  .search-form {
    display: flex;
    gap: 0.65rem;
    flex-wrap: wrap;
  }
  .search-form input {
    flex: 1;
    min-width: 180px;
    padding: 0.65rem 1rem;
    border-radius: 0.6rem;
    border: 1px solid var(--border);
    background: var(--surface2);
    color: var(--text);
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s, background 0.25s;
  }
  .search-form input::placeholder { color: var(--text-muted); }
  .search-form input:focus { border-color: var(--border-focus); }
  .search-form button {
    padding: 0.65rem 1.4rem;
    border-radius: 0.6rem;
    border: none;
    background: var(--accent);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  .search-form button:hover  { background: var(--accent-hover); }
  .search-form button:active { transform: scale(0.97); }

  /* ── Location header ── */
  .location-header {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-bottom: 1.25rem;
  }
  .location-header img { width: 60px; height: 60px; }
  .location-city    { font-size: 1.65rem; font-weight: 800; color: var(--text); }
  .location-country { font-size: 0.88rem; color: var(--text-sub); margin-top: 0.1rem; letter-spacing: 0.05em; text-transform: uppercase; }

  /* ── Weather grid ── */
  .weather-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  .stat {
    background: var(--surface2);
    border-radius: 0.75rem;
    padding: 0.9rem 1rem;
    border: 1px solid var(--border);
    transition: background 0.25s;
  }
  .stat-label {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-muted);
    margin-bottom: 0.35rem;
    font-weight: 600;
  }
  .stat-value { font-size: 1.3rem; font-weight: 700; }
  .stat-sub   { font-size: 0.76rem; color: var(--text-muted); margin-top: 0.2rem; }

  /* ── Temperature colors ── */
  .temp-frozen { color: #60a5fa; }
  .temp-cold   { color: #22d3ee; }
  .temp-mild   { color: #facc15; }
  .temp-warm   { color: #fb923c; }
  .temp-hot    { color: #f87171; }

  .stat-humidity { color: #60a5fa; }
  .stat-wind     { color: #34d399; }
  .stat-feels    { color: var(--text-sub); }

  /* ── Sarcastic comment card ── */
  .comment-card { border-color: var(--comment-border); }
  .comment-label {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--comment-label);
    margin-bottom: 0.75rem;
    font-weight: 700;
  }
  .comment-text {
    font-style: italic;
    line-height: 1.7;
    color: var(--comment-text);
    font-size: 0.97rem;
  }

  /* ── Error card ── */
  .error-card   { border-color: var(--error-border); }
  .error-title  { font-size: 1.15rem; font-weight: 700; color: var(--error-title); margin-bottom: 0.5rem; }
  .error-message{ color: var(--text-sub); line-height: 1.55; }
  .error-back   { display: inline-block; margin-top: 1rem; color: var(--error-link); text-decoration: none; font-size: 0.88rem; }
  .error-back:hover { text-decoration: underline; }

  /* ── Responsive ── */
  @media (max-width: 420px) {
    .weather-grid { grid-template-columns: 1fr; }
    .app-title { font-size: 1.1rem; }
  }
`;

const THEME_SCRIPT = `
  (function () {
    var saved = localStorage.getItem('wd-theme');
    var pref  = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', pref);
  })();
`;

const TOGGLE_SCRIPT = `
  document.addEventListener('DOMContentLoaded', function () {
    var btn  = document.getElementById('theme-toggle');
    var root = document.documentElement;

    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      localStorage.setItem('wd-theme', theme);
      btn.querySelector('.icon').textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.querySelector('.label').textContent = theme === 'dark' ? 'Clair' : 'Sombre';
    }

    // Init icon
    applyTheme(root.getAttribute('data-theme') || 'dark');

    btn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function tempClass(temp) {
  if (temp <= 0)  return 'temp-frozen';
  if (temp <= 10) return 'temp-cold';
  if (temp <= 20) return 'temp-mild';
  if (temp <= 30) return 'temp-warm';
  return 'temp-hot';
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── Shell ───────────────────────────────────────────────────────────────────

function shell(bodyContent) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather Dash</title>
  <script>${THEME_SCRIPT}<\/script>
  <style>${CSS}</style>
</head>
<body>
  <div class="header">
    <div class="app-title">⛅ Weather Dash</div>
    <button class="theme-toggle" id="theme-toggle" aria-label="Changer de thème">
      <span class="icon">☀️</span>
      <span class="label">Clair</span>
    </button>
  </div>
  ${bodyContent}
  <script>${TOGGLE_SCRIPT}<\/script>
</body>
</html>`;
}

// ─── Pages ───────────────────────────────────────────────────────────────────

function renderHome() {
  return shell(`
  <div class="card">
    <form class="search-form" method="GET" action="/">
      <input
        type="text"
        name="city"
        placeholder="Entrez une ville... ex: Marignier"
        autofocus
        autocomplete="off"
      />
      <button type="submit">Chercher</button>
    </form>
  </div>
  `);
}

function renderResult(weather, comment) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  const tc  = tempClass(weather.temp);
  const desc = weather.description.charAt(0).toUpperCase() + weather.description.slice(1);

  return shell(`
  <div class="card">
    <form class="search-form" method="GET" action="/">
      <input type="text" name="city" value="${escapeHtml(weather.city)}" autocomplete="off" />
      <button type="submit">Chercher</button>
    </form>
  </div>

  <div class="card">
    <div class="location-header">
      <img src="${iconUrl}" alt="${escapeHtml(desc)}" />
      <div>
        <div class="location-city">${escapeHtml(weather.city)}</div>
        <div class="location-country">${escapeHtml(weather.country)}</div>
      </div>
    </div>
    <div class="weather-grid">
      <div class="stat">
        <div class="stat-label">Température</div>
        <div class="stat-value ${tc}">${weather.temp}°C</div>
        <div class="stat-sub">Ressenti ${weather.feelsLike}°C</div>
      </div>
      <div class="stat">
        <div class="stat-label">Conditions</div>
        <div class="stat-value" style="font-size:1rem;">${escapeHtml(desc)}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Humidité</div>
        <div class="stat-value stat-humidity">${weather.humidity}%</div>
      </div>
      <div class="stat">
        <div class="stat-label">Vent</div>
        <div class="stat-value stat-wind">${weather.wind} km/h</div>
      </div>
    </div>
  </div>

  <div class="card comment-card">
    <div class="comment-label">🎭 Le styliste dit</div>
    <div class="comment-text">${escapeHtml(comment)}</div>
  </div>
  `);
}

function renderError(title, message) {
  return shell(`
  <div class="card error-card">
    <div class="error-title">⚠ ${escapeHtml(title)}</div>
    <div class="error-message">${escapeHtml(message)}</div>
    <a class="error-back" href="/">← Retour à la recherche</a>
  </div>
  `);
}

module.exports = { renderHome, renderResult, renderError };
