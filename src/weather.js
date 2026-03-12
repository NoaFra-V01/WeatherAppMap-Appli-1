// src/weather.js
const axios = require('axios');

/**
 * Fetches current weather data for a given city from OpenWeatherMap.
 * @param {string} city
 * @returns {Promise<{city, country, temp, feelsLike, description, humidity, wind, icon}>}
 */
async function getWeather(city) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = 'https://api.openweathermap.org/data/2.5/weather';

  const response = await axios.get(url, {
    params: {
      q: city,
      appid: apiKey,
      units: 'metric',
      lang: 'fr',
    },
    timeout: 8000,
  });

  const data = response.data;

  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    humidity: data.main.humidity,
    wind: Math.round(data.wind.speed * 3.6), // m/s → km/h
    icon: data.weather[0].icon,
  };
}

module.exports = { getWeather };
