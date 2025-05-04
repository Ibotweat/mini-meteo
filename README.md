# 🌦️ Météo

Une application météo simple et stylisée, avec fond d'écran dynamique selon la météo (soleil, pluie, neige, orages), créée avec **Node.js**, **Express**, et la météo récupérée via l'API de [wttr.in](https://wttr.in).

---

## ✅ Fonctionnalités

🔍 Recherche de la météo d'une ville

🌡️ Affichage des infos : température, humidité, précipitations, conditions météo

🇫🇷 Traduction automatique des conditions météo en français

🌄 Fond d'écran dynamique selon la météo : soleil, pluie, neige, orage, nuages…


## 🔧 Installation

### Strucutre :

/meteo

├── server.js

├── index.html

├── style.css

├── script.js

├── orages.png

├── pluie.png

├── neige.png

├── soleil.png

├── nuageux.png

└── README.md


### 📦 Dépendances

* express
* node-fetch (v2)

**npm install express node-fetch@2**


### 🌐 Lancement

**npm start**


## 📚 Technologies utilisées

Node.js + Express – pour le backend

node-fetch – pour utiliser l’API wttr.in (gratuite et sans compte)

HTML/CSS/JS – pour l’interface utilisateur

API wttr.in – pour les données météo (aucune clé API requise)
