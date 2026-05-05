// ui.js
export function displayResults(data, query) {
  const resultsDiv = document.getElementById("results");
  if (!resultsDiv) return;

  // Extract nutrients safely
  const nutrients = data.totalNutrients || {};
  const calories = data.calories ? Math.round(data.calories) : "—";
  const protein = nutrients.PROCNT?.quantity?.toFixed(1) || "—";
  const fat = nutrients.FAT?.quantity?.toFixed(1) || "—";
  const carbs = nutrients.CHOCDF?.quantity?.toFixed(1) || "—";
  const fiber = nutrients.FIBTG?.quantity?.toFixed(1) || "—";
  const sugars = nutrients.SUGAR?.quantity?.toFixed(1) || "—";

  // Health score mock (based on Edamam data)
  let healthScore = 70;
  if (protein !== "—" && fiber !== "—" && sugars !== "—") {
    let score = (parseFloat(protein) * 1.5 + parseFloat(fiber) * 2) - (parseFloat(sugars) * 1.2 + parseFloat(fat) * 0.8);
    score = Math.min(100, Math.max(20, Math.round(score + 50)));
    healthScore = score;
  } else if (calories !== "—") {
    if (calories < 200) healthScore = 88;
    else if (calories < 500) healthScore = 70;
    else healthScore = 52;
  }

  const scoreIcon = healthScore >= 75 ? "🍏 Excellent" : (healthScore >= 50 ? "⚡ Good" : "⚠️ Moderate");
  const scoreColor = healthScore >= 75 ? "#4ade80" : (healthScore >= 50 ? "#facc15" : "#f97316");

  resultsDiv.innerHTML = `
    <div class="results-card">
      <div class="product-title"><i class="fas fa-utensils"></i> ${escapeHtml(query)}</div>
      <div class="product-meta">🍽️ Nutrition facts per serving (based on Edamam)</div>
      <div class="nutrient-grid">
        <div class="nutrient-item"><div class="nutrient-value">${calories}</div><div class="nutrient-unit">kcal</div><div class="nutrient-label">Energy</div></div>
        <div class="nutrient-item"><div class="nutrient-value">${protein}</div><div class="nutrient-unit">g</div><div class="nutrient-label">Protein</div></div>
        <div class="nutrient-item"><div class="nutrient-value">${fat}</div><div class="nutrient-unit">g</div><div class="nutrient-label">Fat</div></div>
        <div class="nutrient-item"><div class="nutrient-value">${carbs}</div><div class="nutrient-unit">g</div><div class="nutrient-label">Carbs</div></div>
        <div class="nutrient-item"><div class="nutrient-value">${fiber}</div><div class="nutrient-unit">g</div><div class="nutrient-label">Fiber</div></div>
        <div class="nutrient-item"><div class="nutrient-value">${sugars}</div><div class="nutrient-unit">g</div><div class="nutrient-label">Sugars</div></div>
      </div>
      <div class="health-score" style="border-left: 4px solid ${scoreColor};">
        <i class="fas fa-heartbeat" style="color:${scoreColor};"></i> Health index: ${healthScore}/100 · ${scoreIcon}
      </div>
      <hr>
      <div style="font-size:0.7rem;">🔬 Powered by Edamam · AI enriched</div>
    </div>
  `;
}

export function showError(msg) {
  const resultsDiv = document.getElementById("results");
  if (resultsDiv) {
    resultsDiv.innerHTML = `<div class="results-card"><div class="error-message"><i class="fas fa-exclamation-triangle"></i> ${escapeHtml(msg)}</div></div>`;
  }
}

export function showLoading() {
  const resultsDiv = document.getElementById("results");
  if (resultsDiv) {
    resultsDiv.innerHTML = `<div class="results-card"><div class="loading">Fetching nutrition data...</div></div>`;
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>]/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;' }[m]));
}