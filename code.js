/* ================= RECIPE DATA ARRAY ================= */

// Array of 8 recipe objects
const recipes = [
  {
    id: 1,
    title: "Classic Tomato Pasta",
    time: 25,
    difficulty: "easy",
    description: "A quick and delicious Italian pasta with rich tomato sauce.",
    category: "pasta"
  },
  {
    id: 2,
    title: "Chicken Curry",
    time: 45,
    difficulty: "medium",
    description: "Spicy and flavorful Indian-style chicken curry.",
    category: "curry"
  },
  {
    id: 3,
    title: "Greek Salad",
    time: 15,
    difficulty: "easy",
    description: "Fresh salad with feta cheese, olives, and vegetables.",
    category: "salad"
  },
  {
    id: 4,
    title: "Beef Biryani",
    time: 90,
    difficulty: "hard",
    description: "Traditional layered rice dish with aromatic spices and beef.",
    category: "rice"
  },
  {
    id: 5,
    title: "Vegetable Stir Fry",
    time: 20,
    difficulty: "easy",
    description: "Healthy mixed vegetables stir-fried with soy sauce.",
    category: "vegetarian"
  },
  {
    id: 6,
    title: "Paneer Butter Masala",
    time: 50,
    difficulty: "medium",
    description: "Creamy paneer curry with rich tomato-based gravy.",
    category: "curry"
  },
  {
    id: 7,
    title: "Lamb Rogan Josh",
    time: 120,
    difficulty: "hard",
    description: "Slow-cooked Kashmiri lamb curry with deep flavors.",
    category: "curry"
  },
  {
    id: 8,
    title: "Avocado Toast",
    time: 10,
    difficulty: "easy",
    description: "Simple and healthy breakfast toast with mashed avocado.",
    category: "breakfast"
  }
];

/* ================= DOM SELECTION ================= */

// Select the recipe container div
const recipeContainer = document.querySelector("#recipe-container");

/* ================= CREATE RECIPE CARD FUNCTION ================= */

// Function to create HTML for one recipe card
const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>

      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>

      <p>${recipe.description}</p>
    </div>
  `;
};

/* ================= RENDER RECIPES FUNCTION ================= */

// Function to render an array of recipes
const renderRecipes = (recipeArray) => {
  const recipeHTML = recipeArray
    .map(createRecipeCard) // Convert each recipe to HTML
    .join(""); // Combine all HTML strings

  recipeContainer.innerHTML = recipeHTML; // Insert into DOM
};

/* ================= INITIALIZE APP ================= */

// Render all recipes when the page loads
renderRecipes(recipes);
