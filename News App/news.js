/* The code is declaring two constants: `API_KEY` and `url`. */
const API_KEY = "00bdc09105b2495e90cb67a9b60e4462";
/* The line `const url = "https://newsapi.org/v2/everything?q=";` is declaring a constant variable
named `url` and assigning it the value of the News API endpoint URL. This URL is used to make API
requests to retrieve news articles based on a specific query. The `q=` parameter in the URL is used
to specify the search query for the news articles. */
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("US"));

function reload() {
    window.location.reload();
}


/**
 * The function fetchNews fetches news articles based on a query and API key, and then logs the data
 * and binds it to the UI.
 * @param query - The query parameter is a string that represents the search query for the news
 * articles you want to fetch. It can be any keyword or phrase that you want to search for in the news
 * articles.
 */
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;
    
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank")
    })
}
let currentSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active')
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active');
}
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');
searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav.classList.remove('active');
    currentSelectedNav = null;
})



