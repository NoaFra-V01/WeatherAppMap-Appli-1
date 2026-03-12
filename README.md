# ⛅ Weather Dash

Application web Node.js qui affiche la météo d'une ville avec un commentaire vestimentaire sarcastique.

![Node.js](https://img.shields.io/badge/Node.js-24+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-black?logo=express)
![License](https://img.shields.io/badge/license-ISC-blue)

## Aperçu

Entrez le nom d'une ville, obtenez la météo en temps réel accompagnée d'un conseil vestimentaire sarcastique généré localement.

- 🌡️ Température, ressenti, conditions, humidité, vent
- 🎭 Commentaire sarcastique selon la météo (sans API LLM)
- 🌙 Thème clair / sombre persisté dans le navigateur
- 🛡️ Gestion d'erreurs complète (ville introuvable, clé invalide, réseau…)

## Prérequis

- [Node.js](https://nodejs.org) v18+
- Une clé API [OpenWeatherMap](https://openweathermap.org/api) (gratuite)

## Installation

```bash
# Cloner le projet
git clone https://github.com/VOTRE_USERNAME/weather-dash.git
cd weather-dash

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
```

Éditez `.env` et renseignez votre clé :

```ini
OPENWEATHERMAP_API_KEY=votre_clé_ici
PORT=3000
```

## Lancement

```bash
node index.js
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du projet

```
weather-dash/
├── index.js          # Serveur Express (routes, gestion d'erreurs)
├── src/
│   ├── weather.js    # Intégration OpenWeatherMap
│   ├── llm.js        # Générateur de commentaires sarcastiques (local)
│   └── template.js   # Templates HTML avec thème clair/sombre
├── .env.example      # Modèle de configuration
└── package.json
```

## Variables d'environnement

| Variable | Obligatoire | Description |
|---|---|---|
| `OPENWEATHERMAP_API_KEY` | ✅ | Clé API OpenWeatherMap |
| `PORT` | ❌ | Port du serveur (défaut : `3000`) |

## Licence

ISC