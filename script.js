import { getNews, getSearchNews } from "./api.js";

const newsSearchInput = document.getElementById("newsSearchInput");
const contentWrapper = document.getElementById("contentWrapper");
const messageText = document.getElementById("messageText");

// Load top news on initial startup
getNews().then((data) => {
  if (data && data.articles) {
    renderNews(data.articles);
  }
});

function renderNews(newsData) {
  contentWrapper.innerHTML = "";

  if (!newsData || newsData.length === 0) {
    showMessage("No articles found.");
    return;
  }

  newsData.forEach((news) => {
    const defaultImage = "https://picsum.photos/600";
    const data = {
      urlImage: news.urlToImage ?? defaultImage,
      date: news.publishedAt ? news.publishedAt.slice(0, 10) : "",
      title: news.title ?? "Untitled",
      description: news.description ?? "",
      url: news.url ?? "#",
    };

    const card = `
      <div class="card">
        <div class="card-image-wrapper">
          <img src="${data.urlImage}" alt="${data.title}">
        </div>
        <div class="card-content">
          <span class="card-date">${data.date}</span>
          <h2 class="card-title">
            <a href="${data.url}" target="_blank" rel="noopener noreferrer">${data.title}</a>
          </h2>
          <p class="card-description">
            ${data.description}
          </p>
        </div>
      </div>
    `;

    contentWrapper.insertAdjacentHTML("beforeend", card);
  });

  messageText.style.display = "none";
}

// Live search input handler
newsSearchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim();

  if (query === "") {
    getNews().then((data) => {
      if (data && data.articles) renderNews(data.articles);
    });
  } else {
    getSearchNews(query).then((data) => {
      if (data && data.articles) renderNews(data.articles);
    });
  }
});

export function showMessage(message) {
  contentWrapper.innerHTML = "";
  messageText.style.display = "flex";
  messageText.textContent = message;
}
