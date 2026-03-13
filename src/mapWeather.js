// src/mapWeather.js
const axios = require('axios');

/**
 * Fetches current weather data for given coordinates from OpenWeatherMap.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<{city, country, temp, feelsLike, description, humidity, wind, icon}>}
 */
async function getWeatherByCoords(lat, lon) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = 'https://api.openweathermap.org/data/2.5/weather';

  const response = await axios.get(url, {
    params: {
      lat,
      lon,
      appid: apiKey,
      units: 'metric',
      lang: 'fr',
    },
    timeout: 8000,
  });

  const data = response.data;

  return {
    city:        data.name,
    country:     data.sys.country,
    temp:        Math.round(data.main.temp),
    feelsLike:   Math.round(data.main.feels_like),
    description: data.weather[0].description,
    humidity:    data.main.humidity,
    wind:        Math.round(data.wind.speed * 3.6),
    icon:        data.weather[0].icon,
  };
}

/**
 * Fetches the next 6 forecast slots (3h intervals) for given coordinates.
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<Array<{time: string, icon: string, temp: number}>>}
 */
async function getForecastByCoords(lat, lon) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = 'https://api.openweathermap.org/data/2.5/forecast';

  const response = await axios.get(url, {
    params: {
      lat,
      lon,
      appid: apiKey,
      units: 'metric',
      lang: 'fr',
      cnt: 6,
    },
    timeout: 8000,
  });

  return response.data.list.map((slot) => ({
    time: slot.dt_txt.slice(11, 16),
    icon: slot.weather[0].icon,
    temp: Math.round(slot.main.temp),
  }));
}

module.exports = { getWeatherByCoords, getForecastByCoords };
