// index.js
require('dotenv').config();

const express = require('express');
const { getWeather } = require('./src/weather');
const { getSarcasticComment } = require('./src/llm');
const { renderHome, renderResult, renderError } = require('./src/template');

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Validates that required environment variables are present.
 * Exits the process with a descriptive message if any are missing.
 */
function validateEnv() {
  const required = ['OPENWEATHERMAP_API_KEY'];
  const missing = required.filter((key) => !process.env[key] || process.env[key].trim() === '');

  if (missing.length > 0) {
    console.error(`\n[Weather Dash] Erreur de configuration — variables manquantes :`);
    missing.forEach((key) => console.error(`  - ${key}`));
    console.error(`\nCopiez .env.example vers .env et renseignez votre clé API.\n`);
    process.exit(1);
  }
}

/**
 * Maps API errors to a user-friendly { statusCode, title, message } object.
 * @param {Error} err
 * @param {string} city
 * @returns {{ statusCode: number, title: string, message: string }}
 */
function handleApiError(err, city) {
  // OpenWeatherMap: city not found
  if (err.response?.status === 404) {
    return {
      statusCode: 404,
      title: 'Ville introuvable',
      message: `Impossible de trouver "${city}". Vérifiez l'orthographe ou essayez une ville voisine.`,
    };
  }

  // OpenWeatherMap: bad API key
  if (err.response?.status === 401) {
    return {
      statusCode: 401,
      title: 'Clé API invalide',
      message: 'Vérifiez votre OPENWEATHERMAP_API_KEY dans le fichier .env.',
    };
  }

  // Network error / timeout
  if (err.code === 'ECONNABORTED' || err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
    return {
      statusCode: 503,
      title: 'Erreur réseau',
      message: "Impossible de joindre l'API météo. Vérifiez votre connexion internet.",
    };
  }

  // Fallback
  return {
    statusCode: 500,
    title: 'Erreur inattendue',
    message: err.message || 'Une erreur inconnue est survenue.',
  };
}

// ─── Routes ─────────────────────────────────────────────────────────────────

app.get('/', async (req, res) => {
  const city = req.query.city;

  // No city param → show the search form
  if (!city) {
    return res.send(renderHome());
  }

  // Empty string after trim
  if (city.trim() === '') {
    return res.status(400).send(
      renderError('Aucune ville fournie', 'Entrez le nom d\'une ville dans le formulaire.')
    );
  }

  try {
    const weather = await getWeather(city.trim());
    const comment = getSarcasticComment(weather);
    return res.send(renderResult(weather, comment));
  } catch (err) {
    const { statusCode, title, message } = handleApiError(err, city);
    return res.status(statusCode).send(renderError(title, message));
  }
});

// ─── Start ───────────────────────────────────────────────────────────────────

validateEnv();

app.listen(PORT, () => {
  console.log(`\n  Weather Dash is running`);
  console.log(`  → http://localhost:${PORT}\n`);
});
