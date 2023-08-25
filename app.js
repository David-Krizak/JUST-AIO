// Updated list of supported champion IDs
const champions_supported = [
  "Aatrox",
  "Ahri",
  "Alistar",
  "Amumu",
  "Anivia",
  "Annie",
  "Aphelios",
  "Ashe",
  "Akali",
  "Azir",
  "Blitzcrank",
  "Brand",
  "Caitlyn",
  "Chogath",
  "Corki",
  "Darius",
  "Diana",
  "DrMundo",
  "Draven",
  "Ezreal",
  "Fizz",
  "Graves",
  "Heimerdinger",
  "Irelia",
  "Jhin",
  "Kayle",
  "Kayn",
  "Lillia",
  "Lissandra",
  "MasterYi",
  "Naafiri",
  "Nasus",
  "Nilah",
  "Olaf",
  "Ryze",
  "Samira",
  "Sivir",
  "Xerath",
  "Yasuo",
  "Yone",
];

// Function to update background for supported champions
function updateCardStyle(championId) {
  const champCard = document.querySelector(`[data-champion="${championId}"]`);

  // Check if the champion card exists before modifying its style
  if (champCard) {
    if (champions_supported.includes(championId)) {
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

    for (const championId in championsData) {
      const championInfo = championsData[championId];
      const championCard = document.createElement("div");
      championCard.classList.add("col-md-3", "mb-4", "champion-card");
      championCard.dataset.champion = championId;

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
      updateCardStyle(championId);
    }

    // Add event listener for search input
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const championCards = document.querySelectorAll("[data-champion]");

      championCards.forEach((card) => {
        const championId = card.dataset.champion;
        const shouldDisplay = championId.toLowerCase().includes(searchTerm);
        card.style.display = shouldDisplay ? "block" : "none";
      });
    });
  })
  .catch((error) => console.error("Error fetching champion data:", error));
