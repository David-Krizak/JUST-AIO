const champions_supported = [
  "alistar",
  "amumu",
  "annie",
  "brand",
  "akali",
  "aatrox",
  "aphelios",
  "ashe",
  "azir",
  "blitzcrank",
  "caitlyn",
  "elise",
  "ezreal",
  "fizz",
  "graves",
  "haimerdinger",
  "irelia",
  "jhin",
  "kayn",
  "lillia",
  "master yi",
  "naafiri",
  "nasus",
  "nilah",
  "ryze",
  "samira",
  "sivir",
  "xerath",
  "yasuo",
  "yone",
  "ahri",
  "kayle",
  "lissandra",
];

// Function to update background for supported champions
function updateCardStyle(championName) {
  const lowercaseChampionName = championName.toLowerCase();
  const champCard = document.querySelector(`[data-champion="${championName}"]`);

  // Check if the champion card exists before modifying its style
  if (champCard) {
    if (champions_supported.includes(lowercaseChampionName)) {
      champCard.style.backgroundColor = "rgba(22, 224, 15, 0.69)"; // Light green background color for supported champions
    } else {
      champCard.style.backgroundColor = "#f9f9f9"; // Reset background color for non-supported champions
    }
  }
}

// Fetch champion data from API
fetch(
  "https://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/champion.json"
)
  .then((response) => response.json())
  .then((data) => {
    const championsData = data.data;
    const championsList = document.getElementById("championsList");
    const searchInput = document.getElementById("searchInput");

    for (const champion in championsData) {
      const championInfo = championsData[champion];
      const championCard = document.createElement("div");
      championCard.classList.add("col-md-3", "mb-4", "champion-card");
      championCard.dataset.champion = champion;

      const championIcon = document.createElement("img");
      championIcon.src = `https://ddragon.leagueoflegends.com/cdn/13.14.1/img/champion/${championInfo.image.full}`;
      championIcon.alt = `${championInfo.name} icon`;
      championIcon.classList.add("champion-icon");

      const championName = document.createElement("h5");
      championName.textContent = championInfo.name;
      championName.classList.add("champion-name");

      championCard.appendChild(championIcon);
      championCard.appendChild(championName);
      championsList.appendChild(championCard);

      // Update card style for each champion
      updateCardStyle(championInfo.name);
    }

    // Add event listener for search input
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const championCards = document.querySelectorAll("[data-champion]");

      championCards.forEach((card) => {
        const championName = card.dataset.champion;
        const shouldDisplay = championName.toLowerCase().includes(searchTerm);
        card.style.display = shouldDisplay ? "block" : "none";
      });
    });
  })
  .catch((error) => console.error("Error fetching champion data:", error));
