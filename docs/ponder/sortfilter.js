const hikes = [
  {
    name: "Bechler Falls",
    stub: "bechler_falls",
    imgSrc: "images/hikes/bechler-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 1,
    description: "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls"
  },
  {
    name: "Teton Canyon",
    stub: "teton_canyon",
    imgSrc: "images/hikes/teton-canyon.jpg",
    imgAlt: "Image of Teton Canyon",
    distance: "3 miles",
    tags: ["Canyon", "Tetons"],
    difficulty: 1,
    description: "Beautiful short (or long) hike through Teton Canyon."
  },
  {
    name: "Denanda Falls",
    stub: "denanda_falls",
    imgSrc: "images/hikes/denanda-falls.jpg",
    imgAlt: "Image of Denanda Falls",
    distance: "7 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 3,
    description: "Beautiful hike through Bechler meadows to Denanda Falls"
  },
  {
    name: "Coffee Pot Rapids",
    stub: "coffee_pot",
    imgSrc: "images/hikes/coffee-pot.jpg",
    imgAlt: "Image of Coffee Pot Rapids",
    distance: "2.2 miles",
    tags: ["Rafting"],
    difficulty: 1,
    description: "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids."
  },
  {
    name: "Menan Butte",
    stub: "menan_butte",
    imgSrc: "images/hikes/menan-butte.jpg",
    imgAlt: "Image of Menan Butte",
    distance: "3.4 miles",
    tags: ["Volcanic", "View"],
    difficulty: 2,
    description: "A steep climb to one of the largest volcanic tuff cones in the world."
  }
];

const hikeContainer = document.querySelector("#hike-container");
const input = document.querySelector("#search");
const button = document.querySelector("#searchButton");

button.addEventListener("click", search);
input.addEventListener("keydown", handleEnter);

function handleEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    search();
  }
}

function search() {
  const hikeQuery = input.value.trim().toLowerCase();

  const filteredHikes = hikes.filter((hike) => {
    const inName = hike.name.toLowerCase().includes(hikeQuery);
    const inDescription = hike.description.toLowerCase().includes(hikeQuery);
    const inTags = hike.tags.some((tag) => tag.toLowerCase().includes(hikeQuery));
    return inName || inDescription || inTags;
  });

  const sortedHikes = filteredHikes.sort((a, b) => distanceToNumber(a.distance) - distanceToNumber(b.distance));

  hikeContainer.innerHTML = "";

  if (sortedHikes.length === 0) {
    hikeContainer.innerHTML = '<p class="empty-state">No hikes found. Try a different search.</p>';
    return;
  }

  sortedHikes.forEach((hike) => {
    renderHike(hike);
  });
}

function distanceToNumber(distanceText) {
  const value = parseFloat(distanceText);
  return Number.isNaN(value) ? Number.MAX_SAFE_INTEGER : value;
}

function tagTemplate(tags) {
  return tags.map((tag) => `<span class="hike-tag">${tag}</span>`).join("");
}

function difficultyTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Difficulty: ${rating} out of 5">`;
  for (let i = 1; i <= 5; i += 1) {
    if (i <= rating) {
      html += '<span aria-hidden="true" class="icon-boot">🥾</span>';
    } else {
      html += '<span aria-hidden="true" class="icon-empty">▫️</span>';
    }
  }
  html += "</span>";
  return html;
}

function hikesTemplate(hike) {
  return `<article class="hike-card">
    <img class="hike-image" src="${hike.imgSrc}" alt="${hike.imgAlt}">
    <div class="hike-content">
      <h2>${hike.name}</h2>
      <p class="hike-meta"><strong>Distance:</strong> ${hike.distance}</p>
      <div class="hike-tags">${tagTemplate(hike.tags)}</div>
      <p>${hike.description}</p>
      <p><strong>Difficulty:</strong> ${difficultyTemplate(hike.difficulty)}</p>
    </div>
  </article>`;
}

function renderHike(hike) {
  hikeContainer.insertAdjacentHTML("beforeend", hikesTemplate(hike));
}

function init() {
  const randomNum = Math.floor(Math.random() * hikes.length);
  renderHike(hikes[randomNum]);
}

init();
