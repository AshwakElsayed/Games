// <==================> Glopal<==================>


// <==================> When satrt<==================>
let searchParams = location.search;
let params=new URLSearchParams(searchParams);
let id = params.get('id');
let contanierDetalis ;

(async function () {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fbdc4c29c4mshf4466330db9afe4p18d52fjsnb1a7bb637cd8',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    const api =await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
    const response= await api.json();
     contanierDetalis= response;
    //console.log(response);
    dispalyDetails()
})()
// <==================> Events <==================>

let mode=document.getElementById('mode');
mode.addEventListener('click' , function (e) {
    if (mode.classList.contains('fa-sun')) {
        document.querySelector('html').setAttribute("data-theme" , "light")
        mode.classList.replace('fa-sun' ,'fa-moon' )
        localStorage.setItem('theme' , 'light')

    }
    else{
        mode.classList.replace( 'fa-moon' ,'fa-sun')
        document.querySelector('html').setAttribute("data-theme" , "dark")
        localStorage.setItem('theme' , 'dark')

    }
})
if (localStorage.getItem('theme') != null) {
    let themeData =localStorage.getItem("theme");
    if (themeData === 'light') {
        mode.classList.replace('fa-sun' ,'fa-moon' )
        
    }
    else{
        mode.classList.replace( 'fa-moon' ,'fa-sun')
    }
    document.querySelector('html').setAttribute("data-theme" , themeData)
}
// <==================> Functions <==================>
function dispalyDetails() {
    detalisBox= `<header class="hstack justify-content-between">
    <h1 class="text-center h3">Details Game</h1>
    <a class="btn btn-close btn-close-white" href="home.html" id="btnClose" ></a>
    </header>
    <div class="col-md-4">
    <figure>
       <img src="${contanierDetalis.thumbnail}" class="w-100" alt="details image" />
    </figure>
 </div>
 <div class="col-md-8">
 
    <div>
       <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
          <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
          <li class="breadcrumb-item text-info" aria-current="page">${contanierDetalis.title}</li>
          </ol>
       </nav>
       <!-- <h1>${contanierDetalis.title}</h1> -->
       <h3>About ${contanierDetalis.title}</h3>
       <p>Category: <span class="badge text-bg-info"> ${contanierDetalis.genre}</span> </p>
       <p>Platform: <span class="badge text-bg-info"> ${contanierDetalis.platform}</span> </p>
       <p>Status: <span class="badge text-bg-info"> ${contanierDetalis.status}</span> </p>
       <p>${contanierDetalis.description}</p>
       <a class="btn btn-outline-warning" target="_blank" href="${contanierDetalis.game_url}">Show Game</a>
 
       
    </div>
 </div>`;

  document.getElementById('detailsData').innerHTML =detalisBox;

  const backGroundImage =contanierDetalis.thumbnail.replace("thumbnail" , "background");

  document.body.style.cssText=`
  background-image:url('${backGroundImage}');
  background-size:cover;
  background-psition:center;`;


}