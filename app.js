// app.js
import { getNutrition } from './api.js';
import { displayResults, showError, showLoading } from './ui.js';

async function analyzeFood() {
  const foodInput = document.getElementById("foodInput");
  const food = foodInput.value.trim();

  if (!food) {
    showError("Please enter a food or drink name.");
    return;
  }

  showLoading();

  try {
    const nutritionData = await getNutrition(food);
    displayResults(nutritionData, food);
  } catch (error) {
    showError(error.message || "Failed to fetch nutrition data. Check your API key or network.");
  }
}

// Attach to window for onclick in HTML
window.analyzeFood = analyzeFood;

// Optional: allow Enter key to submit
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("foodInput");
  if (input) {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") analyzeFood();
    });
  }
});