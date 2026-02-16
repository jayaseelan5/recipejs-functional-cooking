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

/* ================= STATE MANAGEMENT ================= */

// Current filter and sort state (immutable pattern)
let appState = {
  currentFilter: "all",
  currentSort: null
};

/* ================= DOM SELECTION ================= */

// Select the recipe container div
const recipeContainer = document.querySelector("#recipe-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const sortButtons = document.querySelectorAll(".sort-btn");

/* ================= PURE FILTER FUNCTIONS ================= */

// Pure function: Filter by difficulty level
const filterByDifficulty = (difficulty, recipesArray) => {
  return recipesArray.filter(recipe => recipe.difficulty === difficulty);
};

// Pure function: Filter quick recipes (under 30 minutes)
const filterQuickRecipes = (recipesArray) => {
  return recipesArray.filter(recipe => recipe.time < 30);
};

// Pure function: Main filter logic (composition of filters)
const applyFilter = (filter, recipesArray) => {
  if (filter === "all") return recipesArray;
  if (filter === "quick") return filterQuickRecipes(recipesArray);
  return filterByDifficulty(filter, recipesArray);
};

/* ================= PURE SORT FUNCTIONS ================= */

// Pure function: Sort by name alphabetically (A-Z)
const sortByName = (recipesArray) => {
  return [...recipesArray].sort((a, b) => 
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );
};

// Pure function: Sort by time (fastest first)
const sortByTime = (recipesArray) => {
  return [...recipesArray].sort((a, b) => a.time - b.time);
};

// Pure function: Main sort logic (composition of sorts)
const applySort = (sort, recipesArray) => {
  if (sort === "name") return sortByName(recipesArray);
  if (sort === "time") return sortByTime(recipesArray);
  return recipesArray;
};

/* ================= CREATE RECIPE CARD FUNCTION ================= */

// Pure function to create HTML for one recipe card
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

// Pure function to render an array of recipes
const renderRecipes = (recipeArray) => {
  const recipeHTML = recipeArray
    .map(createRecipeCard)
    .join("");

  recipeContainer.innerHTML = recipeHTML;
};

/* ================= UPDATE DISPLAY FUNCTION ================= */

// Higher-order function: Combines filter and sort operations
const updateDisplay = () => {
  // Step 1: Apply filter to original recipes array (no mutation!)
  const filteredRecipes = applyFilter(appState.currentFilter, recipes);

  // Step 2: Apply sort to filtered results (no mutation!)
  const finalRecipes = applySort(appState.currentSort, filteredRecipes);

  // Step 3: Render the results
  renderRecipes(finalRecipes);
};

/* ================= EVENT LISTENERS ================= */

// Add click listeners to filter buttons
filterButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    // Remove active class from all filter buttons
    filterButtons.forEach(btn => btn.classList.remove("active"));

    // Add active class to clicked button
    event.target.classList.add("active");

    // Update state with new filter
    appState = {
      ...appState,
      currentFilter: event.target.dataset.filter
    };

    // Re-render display
    updateDisplay();
  });
});

// Add click listeners to sort buttons
sortButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    // Remove active class from all sort buttons
    sortButtons.forEach(btn => btn.classList.remove("active"));

    // Add active class to clicked button
    event.target.classList.add("active");

    // Update state with new sort
    appState = {
      ...appState,
      currentSort: event.target.dataset.sort
    };

    // Re-render display
    updateDisplay();
  });
});

/* ================= INITIALIZE APP ================= */

// Render all recipes when the page loads
updateDisplay();

