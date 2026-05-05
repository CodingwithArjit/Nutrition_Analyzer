// api.js
async function getNutrition(food) {
  const clientId = "c413d31052364e5eb2308f5d3be3cefd";   // your app_id
  const clientSecret = "785896933a0343b7bb169eb07ccd72f2"; // removed leading space

  const url = `https://api.edamam.com/api/nutrition-data?app_id=${clientId}&app_key=${clientSecret}&ingr=${encodeURIComponent(food)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    if (data.code && data.message) throw new Error(data.message); // API error message
    return data;
  } catch (error) {
    console.error("Edamam API error:", error);
    throw error;
  }
}