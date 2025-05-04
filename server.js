const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // npm install node-fetch@2

const app = express();
const PORT = process.env.PORT || 4000;

// Liste de traductions météo simplifiée
const traductions = {
  "clear": "Dégagé",
  "sunny": "Ensoleillé",
  "partly cloudy": "Partiellement nuageux",
  "cloudy": "Nuageux",
  "overcast": "Très nuageux",
  "mist": "Brume",
  "patchy rain": "Possibilité de pluie éparse",
  "thunder": "Orage",
  "fog": "Brouillard",
  "light rain": "Pluie légère",
  "heavy rain": "Forte pluie",
  "snow": "Neige",
  "drizzle": "Bruine",
  "shower": "Averse"
};

// Servir les fichiers statiques (index.html, script.js, etc.)
app.use(express.static(path.join(__dirname)));

// Route API météo
app.get('/api/meteo', async (req, res) => {
  const ville = req.query.ville;
  if (!ville) return res.status(400).json({ error: "Aucune ville spécifiée." });

  try {
    const url = `https://wttr.in/${encodeURIComponent(ville)}?format=j1`;
    const response = await fetch(url);
    const data = await response.json();

    const villeTrouvée = data.nearest_area?.[0]?.areaName?.[0]?.value?.toLowerCase();
    if (!villeTrouvée || !villeTrouvée.includes(ville.toLowerCase().slice(0, 3))) {
      return res.status(404).json({ error: "Ville inconnue. Vérifie l’orthographe." });
    }

    // Traduction automatique intelligente
    const originalDesc = data.current_condition?.[0]?.weatherDesc?.[0]?.value || "";
    const descLower = originalDesc.toLowerCase();

    for (const [cleAnglaise, traductionFr] of Object.entries(traductions)) {
      if (descLower.includes(cleAnglaise)) {
        data.current_condition[0].weatherDesc[0].value = traductionFr;
        break;
      }
    }

    res.json(data);
  } catch (err) {
    console.error("Erreur météo serveur :", err);
    res.status(500).json({ error: "Impossible de récupérer les données météo." });
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
