const recipes = [
  {
    name: "Apple Crisp",
    description:
      "A warm and cozy apple dessert with cinnamon apples and a buttery oat topping.",
    tags: ["Dessert", "Apple", "Baked"],
    image: "images/apple-crisp.jpg",
    imageAlt: "A bowl of apple crisp",
    rating: 4
  },
  {
    name: "Black Beans and Rice",
    description:
      "A hearty rice bowl with seasoned black beans that works great as a quick weeknight meal.",
    tags: ["Dinner", "Rice", "Beans", "Vegetarian"],
    image: "images/black-beans-and-rice.jpg",
    imageAlt: "Black beans and rice served in a bowl",
    rating: 4
  },
  {
    name: "Chicken Curry",
    description:
      "Tender chicken in a rich curry sauce with warm spices and creamy texture.",
    tags: ["Dinner", "Chicken", "Curry"],
    image: "images/chicken-curry.webp",
    imageAlt: "Chicken curry in a serving dish",
    rating: 5
  },
  {
    name: "Chocolate Chip Cookies",
    description:
      "Soft and chewy chocolate chip cookies with crisp edges and gooey centers.",
    tags: ["Dessert", "Cookies", "Chocolate"],
    image: "images/chocolate-chip-cookies.jpg",
    imageAlt: "Plate of chocolate chip cookies",
    rating: 5
  },
  {
    name: "Escalopes de Poulet a la Creme",
    description:
      "Creamy chicken with mushrooms and mustard, served over rice for an easy entree.",
    tags: ["Dinner", "Chicken", "Creamy"],
    image: "images/escalopes-de-poulet-a-la-creme.webp",
    imageAlt: "Creamy chicken dish on a plate",
    rating: 4
  },
  {
    name: "German Gooseberry Cake",
    description:
      "A lightly sweet cake filled with tart gooseberries and a tender crumb.",
    tags: ["Dessert", "Cake", "Fruit"],
    image: "images/german-gooseberry-cake.jpg",
    imageAlt: "Slice of gooseberry cake",
    rating: 4
  },
  {
    name: "Roasted Potatoes",
    description:
      "Crispy roasted potatoes with a fluffy center and savory herb flavor.",
    tags: ["Side", "Potato", "Roasted"],
    image: "images/roasted-potatoes.webp",
    imageAlt: "Roasted potato wedges",
    rating: 4
  },
  {
    name: "Sweet Potato Waffles",
    description:
      "Savory waffles made with sweet potato and ginger, perfect for brunch or a side.",
    tags: ["Waffles", "Sweet Potato", "Side"],
    image: "images/sweet-potato-waffle-md.jpg",
    imageAlt: "Stack of sweet potato waffles",
    rating: 4
  }
];

const recipeList = document.querySelector("#recipeList");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#recipeSearch");

function tagTemplate(tags) {
  return tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
}

function ratingTemplate(rating) {
  const filled = "★".repeat(rating);
  const empty = "☆".repeat(5 - rating);
  return `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">${filled}${empty}</span>`;
}

function recipeCardTemplate(recipe) {
  return `
    <article class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.imageAlt}" class="recipe-image" width="640" height="427">
      <div class="recipe-content">
        <div class="tags">${tagTemplate(recipe.tags)}</div>
        <h2>${recipe.name}</h2>
        ${ratingTemplate(recipe.rating)}
        <p class="description">${recipe.description}</p>
      </div>
    </article>
  `;
}

function renderRecipes(recipeArray) {
  if (!recipeArray.length) {
    recipeList.innerHTML = '<p class="empty-message">No recipes found. Try a different keyword.</p>';
    return;
  }

  recipeList.innerHTML = recipeArray.map(recipeCardTemplate).join("");
}

function randomRecipe() {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  return recipes[randomIndex];
}

function filterRecipes(query) {
  const lowerQuery = query.trim().toLowerCase();

  if (!lowerQuery) {
    return [randomRecipe()];
  }

  return recipes
    .filter((recipe) => {
      const inName = recipe.name.toLowerCase().includes(lowerQuery);
      const inDescription = recipe.description.toLowerCase().includes(lowerQuery);
      const inTags = recipe.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));
      return inName || inDescription || inTags;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function handleSearch(event) {
  event.preventDefault();
  renderRecipes(filterRecipes(searchInput.value));
}

searchForm.addEventListener("submit", handleSearch);
renderRecipes([randomRecipe()]);
