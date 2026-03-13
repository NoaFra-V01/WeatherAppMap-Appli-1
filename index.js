// index.js
require('dotenv').config();

const express = require('express');
const { getWeather } = require('./src/weather');
const { getSarcasticComment } = require('./src/llm');
const { renderHome, renderResult, renderError } = require('./src/template');
const { getWeatherByCoords, getForecastByCoords } = require('./src/mapWeather');

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

// ─── API map endpoint ─────────────────────────────────────────────────────────

app.get('/api/weather-at', async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);
  const withForecast = req.query.forecast === '1';

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: 'Paramètres lat et lon requis (nombres valides).' });
  }

  try {
    if (withForecast) {
      const [current, forecast] = await Promise.all([
        getWeatherByCoords(lat, lon),
        getForecastByCoords(lat, lon),
      ]);
      return res.json({ ...current, forecast });
    }

    const data = await getWeatherByCoords(lat, lon);
    return res.json(data);
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: 'Aucune donnée météo disponible pour ces coordonnées.' });
    }
    if (err.code === 'ECONNABORTED' || err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
      return res.status(503).json({ error: "Impossible de joindre l'API météo." });
    }
    return res.status(500).json({ error: err.message || 'Erreur inconnue.' });
  }
});

// ─── Start ───────────────────────────────────────────────────────────────────

validateEnv();

app.listen(PORT, () => {
  console.log(`\n  Weather Dash is running`);
  console.log(`  → http://localhost:${PORT}\n`);
});
