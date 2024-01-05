
const API_KEY = "2fb7110e501d4acaa833ee0a8f29a2f0";

const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load', () => fetchNews("India"));

//fetch is an async operation like news is on some another server so using fetch we can call the news

function reload() {
    window.location.reload();
}


async function fetchNews(query) {

    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
    //console.log(data);
}


function bindData(articles) {

    const cardsContainer = document.getElementById("cards-container");

    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = '';

    articles.forEach(article => {

        if(!article.urlToImage) return; //jis ke pass img nhi rahega usko nhi dikhaye ye if statement thikk hai

        const cardClone = newsCardTemplate.content.cloneNode(true); //iska matlb deep cloneing karna chahte hai matlb templet ke ander jitne bhi template hai wo sab ke sab clone ho jane chahiye sirf ek card clone na ho aisa karna hai humko 

        fillDataInCard(cardClone , article);

        cardsContainer.appendChild(cardClone);

    });



}

function fillDataInCard(cardClone , article) {

    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-tittle');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDescription = cardClone.querySelector('#news-desc');


    newsImg.src  = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDescription.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
        timeZone: "Asia/kolkata"

    });

    newsSource.innerHTML = `${article.source.name} 🔹 ${date}`;

    cardClone.firstElementChild.addEventListener('click' , () => {

        window.open(article.url, "_blank");

    });
   
   
}

let curserSelectToNav = null;

function onNavItemClick(id) {
    
    fetchNews(id);

    const navItem = document.getElementById(id);
    curserSelectToNav?.classList.remove('active');

    curserSelectToNav = navItem;

    curserSelectToNav.classList.add('active');


}


const searchButton = document.getElementById('search-btn');

const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {

    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curserSelectToNav?.classList.remove('active');
    curserSelectToNav = null;

})


    




