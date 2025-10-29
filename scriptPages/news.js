const apiKey = "04f501aa9ce4427e807a1ab8c72b47fa"; 
const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Fetch top football headlines
function getFootballHeadlines() {
  fetch(`https://newsapi.org/v2/top-headlines?category=sports&q=football&language=en&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      displayNews(data.articles);
    })
    .catch(error => console.log("Error fetching football news:", error));
}

// Search for football-related news
function searchNews(query) {
  fetch(`https://newsapi.org/v2/everything?q=${query}+football&language=en&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      displayNews(data.articles);
    })
    .catch(error => console.log("Error searching news:", error));
}

// Display news in Bootstrap cards
function displayNews(articles) {
  newsContainer.innerHTML = "";

  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = "<p class='text-center text-muted'>No results found.</p>";
    return;
  }

  articles.forEach(article => {
    const imageUrl = article.urlToImage || "https://via.placeholder.com/400x250?text=No+Image";
    const card = `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${imageUrl}" class="card-img-top" alt="News Image">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    `;
    newsContainer.innerHTML += card;
  });
}

// Search button click event
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    searchNews(query);
  } else {
    getFootballHeadlines();
  }
});

// Load top football headlines when the page loads
getFootballHeadlines();
