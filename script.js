async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Veuillez entrer une ville !");
    return;
  }

  try {
    const response = await fetch(`/api/meteo?ville=${encodeURIComponent(city)}`);
    if (!response.ok) throw new Error("Erreur de la requête serveur");

    const data = await response.json();
    const current = data.current_condition[0];
    const weatherDesc = current.weatherDesc[0].value.toLowerCase();

    // Définir l'image de fond selon la météo
    let image = "soleil.png"; // par défaut
    if (weatherDesc.includes("pluie") || weatherDesc.includes("rain")) {
      image = "pluie.png";
    } else if (weatherDesc.includes("neige") || weatherDesc.includes("snow")) {
      image = "neige.png";
    } else if (weatherDesc.includes("orage") || weatherDesc.includes("thunder")) {
      image = "orages.png";
    } else if (weatherDesc.includes("nuage") || weatherDesc.includes("cloud")) {
      image = "nuageux.png";
    } else if (weatherDesc.includes("soleil") || weatherDesc.includes("sun")) {
      image = "soleil.png";
    }

    // Appliquer l'image comme fond
    document.body.style.backgroundImage = `url('${image}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // Mettre à jour les infos météo
    const resultDiv = document.getElementById("weatherResult");
    resultDiv.innerHTML = `
      <h2>🌍 Météo à ${city.charAt(0).toUpperCase() + city.slice(1)}</h2>
      <p>🌡️ Température : ${current.temp_C} °C</p>
      <p>💧 Humidité : ${current.humidity} %</p>
      <p>☔ Précipitation : ${current.precipMM} mm</p>
      <p>⛅ Temps : ${current.weatherDesc[0].value}</p>
    `;
  } catch (error) {
    console.error(error);
    alert("Impossible de récupérer la météo. Réessaie plus tard.");
  }
}
