const analysisContainer = document.getElementById("analysisContainer");
const compareBtn = document.getElementById("compareBtn");

// Function to fetch team info from TheSportsDB API
async function getTeamInfo(teamName) {
  const baseUrl = "https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=";
  
  async function tryFetch(name) {
    const res = await fetch(`${baseUrl}${encodeURIComponent(name)}`);
    const data = await res.json();
    return data.teams ? data.teams[0] : null;
  }

  // Try exact name
  let team = await tryFetch(teamName);
  if (team) return team;

  // Try with "FC" prefix (common in soccer)
  team = await tryFetch(`FC ${teamName}`);
  if (team) return team;

  // Try with lowercase (just in case)
  team = await tryFetch(teamName.toLowerCase());
  return team;
}


// Handle Compare Button Click
compareBtn.addEventListener("click", async function() {
  const team1Name = document.getElementById("team1Input").value.trim();
  const team2Name = document.getElementById("team2Input").value.trim();

  if (team1Name === "" || team2Name === "") {
    alert("Please enter both team names!");
    return;
  }

  analysisContainer.innerHTML = `<p>Loading comparison...</p>`;

  const team1 = await getTeamInfo(team1Name);
  const team2 = await getTeamInfo(team2Name);

  if (!team1 || !team2) {
    analysisContainer.innerHTML = `<p>One or both teams not found. Please try again.</p>`;
    return;
  }

  // Display both teams in cards
  analysisContainer.innerHTML = `
    <div class="col-md-6">
      <div class="card shadow-sm p-3 text-center">
        <img src="${team1.strTeamBadge}" width="100" alt="${team1.strTeam}">
        <h4 class="mt-2">${team1.strTeam}</h4>
        <p><b>Country:</b> ${team1.strCountry}</p>
        <p><b>Founded:</b> ${team1.intFormedYear}</p>
        <p><b>Stadium:</b> ${team1.strStadium}</p>
        <p class="small text-muted">${team1.strDescriptionEN?.substring(0, 100) || "No description available."}...</p>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card shadow-sm p-3 text-center">
        <img src="${team2.strTeamBadge}" width="100" alt="${team2.strTeam}">
        <h4 class="mt-2">${team2.strTeam}</h4>
        <p><b>Country:</b> ${team2.strCountry}</p>
        <p><b>Founded:</b> ${team2.intFormedYear}</p>
        <p><b>Stadium:</b> ${team2.strStadium}</p>
        <p class="small text-muted">${team2.strDescriptionEN?.substring(0, 100) || "No description available."}...</p>
      </div>
    </div>
  `;
});
