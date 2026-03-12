// src/llm.js — commentaires sarcastiques locaux (sans API)

const COMMENTS = {
  frozen: [ // <= 0°C
    (w) => `${w.temp}°C à ${w.city}... même les pingouins refusent de sortir. Empilez les pulls, et peut-être un igloo en option.`,
    (w) => `Il gèle à ${w.city}. Si vous sortez quand même, portez tout ce que vous avez dans votre armoire, en même temps.`,
    (w) => `${w.temp}°C ressenti ${w.feelsLike}°C. À ${w.city}, le vent ne rigole pas. Bonnet, écharpe, moufles — et encore, bonne chance.`,
  ],
  cold: [ // <= 10°C
    (w) => `${w.temp}°C à ${w.city}, c'est officiellement la saison du manteau qu'on refuse de mettre. Spoiler : vous allez avoir froid.`,
    (w) => `Frais et ${w.description} à ${w.city}. Une veste correcte serait bienvenue, mais faites comme vous voulez.`,
    (w) => `Ressenti ${w.feelsLike}°C à ${w.city}. Votre veste légère ne suffira pas — mais libre à vous d'apprendre à la dure.`,
  ],
  mild: [ // <= 20°C
    (w) => `${w.temp}°C à ${w.city} — ni chaud, ni froid. La météo est aussi indécise que votre garde-robe ce matin.`,
    (w) => `${w.description} et ${w.temp}°C à ${w.city}. Une petite veste, au cas où. Ou pas. De toute façon vous l'oublierez dans le bus.`,
    (w) => `Temps correct à ${w.city}. Profitez-en, ça ne durera pas. Une couche légère suffira... pour l'instant.`,
  ],
  warm: [ // <= 30°C
    (w) => `${w.temp}°C à ${w.city} — il fait presque bon. T-shirt toléré, mais la crème solaire reste non négociable.`,
    (w) => `Chaud et ${w.description} à ${w.city}. Légèreté vestimentaire recommandée, déshydratation non incluse.`,
    (w) => `${w.temp}°C ressenti ${w.feelsLike}°C. À ${w.city} on transpire chic — robe ou chemise légère, rien de lourd.`,
  ],
  hot: [ // > 30°C
    (w) => `${w.temp}°C à ${w.city}. Vous sortez quand même ? Chapeau, lunettes et une bouteille d'eau. Ou restez chez vous, c'est aussi une option.`,
    (w) => `Canicule à ${w.city} : ${w.temp}°C, ressenti ${w.feelsLike}°C. Le minimum syndical vestimentaire est de rigueur. La dignité, elle, fond.`,
    (w) => `${w.temp}°C à ${w.city} — même le bitume souffre. Tissu léger, couleurs claires, et fuyez les espaces sans clim.`,
  ],
};

const WIND_BONUS = [
  { threshold: 50, suffix: ` Et avec ${'{wind}'} km/h de vent, accrochez votre chapeau.` },
  { threshold: 30, suffix: ` Le vent à ${'{wind}'} km/h fera son petit effet sur votre coiffure.` },
];

const HUMIDITY_BONUS = [
  { threshold: 85, suffix: ` Avec ${'{hum}'}% d'humidité, l'effet serre est garanti.` },
];

/**
 * Picks a deterministic-ish comment based on weather data.
 * @param {object} weather
 * @returns {string}
 */
function getSarcasticComment(weather) {
  let bucket;
  if (weather.temp <= 0)  bucket = COMMENTS.frozen;
  else if (weather.temp <= 10) bucket = COMMENTS.cold;
  else if (weather.temp <= 20) bucket = COMMENTS.mild;
  else if (weather.temp <= 30) bucket = COMMENTS.warm;
  else bucket = COMMENTS.hot;

  const idx = (weather.humidity + weather.wind + Math.abs(weather.temp)) % bucket.length;
  let comment = bucket[idx](weather);

  for (const bonus of WIND_BONUS) {
    if (weather.wind >= bonus.threshold) {
      comment += bonus.suffix.replace('{wind}', weather.wind);
      break;
    }
  }
  for (const bonus of HUMIDITY_BONUS) {
    if (weather.humidity >= bonus.threshold) {
      comment += bonus.suffix.replace('{hum}', weather.humidity);
      break;
    }
  }

  return comment;
}

module.exports = { getSarcasticComment };
