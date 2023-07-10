const API_KEY =  "c6bcdde7bb8d2c7dd8b3f8b26f33994c" ;
const url = "https://gnews.io/api/v4/search?q=";

window.addEventListener('load' ,() => fetchNews("General")) ;

async function fetchNews(query){
    const res = await fetch(`${url}${query}&lang=en&country=in&apikey=${API_KEY}`);
  const data = await res.json() ;
  bindData(data.articles) ;
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container') ;
    const newsCardTemplate = document.getElementById('template-news-card') ;

    cardsContainer.innerHTML = "" ;

    articles.forEach((article) => {
        if(!article.image) return ;
        const cardClone = newsCardTemplate.content.cloneNode(true) ;
        fillDataInCard(cardClone,article) ; 
        cardsContainer.appendChild(cardClone) ;
    });
    
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img') ;
    const newsTitle = cardClone.querySelector('#news-title') ;
    const newsSource = cardClone.querySelector('#news-src') ;
    const newsDesc = cardClone.querySelector('#news-desc') ;

    newsImg.src = article.image ;
    newsTitle.innerHTML = article.title ;
    newsDesc.innerHTML = article.description ;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      });
      newsSource.innerHTML = `${article.source.name} · ${date}`;

    // let timestamp = new Date(article.publishedAt).getTime();
    // let Day = new Date(timestamp).getDate();
    // let Month = new Date(timestamp).getMonth() + 1;
    // let Year = new Date(timestamp).getFullYear();
    // let OurNewDateFormat = `${Day}/${Month}/${Year}`;
    // newsSource.innerHTML = `${article.source.name} . ${OurNewDateFormat}` ;
    
    cardClone.firstElementChild.addEventListener('click' , ()=>{
        window.open(article.url , "_blank") ;
    }) ;
}
let curSelectedNav = null ;
function navitem(id){
    fetchNews(id) ;
  const item = document.getElementById(id) ;
  curSelectedNav?.classList.remove('active') ;
  curSelectedNav = item ;
  curSelectedNav.classList.add('active') ;
}

const searchbutton = document.getElementById('search-btn') ;
const searchtext = document.getElementById('inputtext') ;

searchtext.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchbutton.click();
    }
  });

searchbutton.addEventListener('click' ,()=>{
    const query = searchtext.value ;
    if(!query) return ;
    fetchNews(query) ;
    curSelectedNav.classList.remove('active') ;
    curSelectedNav = null ;
}) ;
function reload(){
    window.location.reload() ;
}