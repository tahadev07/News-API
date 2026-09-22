import { showMessage } from "./script.js";

// Insert your free API key from https://newsapi.org here
const API_KEY = "65e8826c4b7246af839ae7771c90c075";
const BASE_URL = "https://newsapi.org/v2";

export async function getNews() {
  try {
    showMessage("Loading...");
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    showMessage("Failed to load news.");
  }
}

export async function getSearchNews(query) {
  try {
    showMessage("Loading...");
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching news:", error);
    showMessage("Failed to fetch search results.");
  }
}
