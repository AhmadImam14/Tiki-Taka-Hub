// main.js

const matchesContainer = document.getElementById("matchesContainer");

// 🔑 Replace this with your API key
const API_KEY = "YOUR_API_KEY_HERE";

async function fetchLiveMatches() {
  try {
    const response = await fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
      }
    });

    const data = await response.json();
    const matches = data.response;

    matchesContainer.innerHTML = "";

    if (matches.length === 0) {
      matchesContainer.innerHTML = `<p>No live matches at the moment.</p>`;
      return;
    }

    matches.forEach(match => {
      const home = match.teams.home.name;
      const away = match.teams.away.name;
      const homeLogo = match.teams.home.logo;
      const awayLogo = match.teams.away.logo;
      const goalsHome = match.goals.home;
      const goalsAway = match.goals.away;
      const status = match.fixture.status.short;

      const card = `
        <div class="col-md-4">
          <div class="card shadow-sm p-3">
            <div class="d-flex justify-content-between align-items-center">
              <div class="text-center">
                <img src="${homeLogo}" alt="${home}" width="50"><br>
                <small>${home}</small>
              </div>
              <h5>${goalsHome ?? 0} - ${goalsAway ?? 0}</h5>
              <div class="text-center">
                <img src="${awayLogo}" alt="${away}" width="50"><br>
                <small>${away}</small>
              </div>
            </div>
            <p class="mt-2 text-muted">Status: ${status}</p>
          </div>
        </div>`;
      matchesContainer.innerHTML += card;
    });

  } catch (error) {
    console.error("Error fetching live matches:", error);
    matchesContainer.innerHTML = `<p>Failed to load live matches.</p>`;
  }
}

// Run on load
fetchLiveMatches();
