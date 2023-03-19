
// <============> Global <================>

let data=[]
let loading=document.querySelector('.loading')
// <============> When start <================>
getGames('mmorpg');
// <============> Events <================>

document.querySelectorAll('.menu a').forEach(function (link) {
    link.addEventListener('click' , function () {
        document.querySelector('.menu .active').classList.remove('active');
        link.classList.add('active');
        const category= link.getAttribute('data-category');
        //console.log(category);
        getGames(category);
    })
})
document.querySelector(".logout-btn").addEventListener("click" , function () {
    localStorage.removeItem("uToken")
    location.href="./index.html"
});

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
// <============> Functions <================>

async function getGames(categoryName) {
    loading.classList.remove('d-none')
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fbdc4c29c4mshf4466330db9afe4p18d52fjsnb1a7bb637cd8',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const api =await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`, options);
    const response=await api.json();
    //console.log(response);
    data =response
    dispalyGames()
    loading.classList.add('d-none')    
}

function dispalyGames() {
    let gamesBox =``

    for (let i = 0; i <data.length; i++) {
        let videoPath= data[i].thumbnail.replace("thumbnail.jpg" , "videoplayback.webm");

        gamesBox +=  `
        <div class="col">
        <div onmouseleave="stopVideo(event)" onmouseenter='startVideo(event)' onclick="showDetails(${data[i].id})" class="card h-100 bg-transparent" role="button" (${ data[i].id })">
           <div class="card-body">
              <figure class="position-relative">
                 <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" />
               <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                <source src="${videoPath}">
                </video>
              </figure>
  
              <figcaption>
  
                 <div class="hstack justify-content-between">
                    <h3 class="h6 small">${data[i].title}</h3>
                    <span class="badge text-bg-primary p-2">Free</span>
                 </div>
  
                 <p class="card-text small text-center opacity-50">
                    ${data[i].short_description.split(" ", 8)}
                 </p>
  
              </figcaption>
           </div>
  
           <footer class="card-footer small hstack justify-content-between">
  
              <span class="badge badge-color">${data[i].genre}</span>
              <span class="badge badge-color">${data[i].platform}</span>
  
           </footer>
        </div>
     </div>
        `;
        
    }
    document.getElementById('gameData').innerHTML= gamesBox
}

function startVideo(event) {
    let videoEl = event.target.querySelector('video');
    videoEl.classList.remove("d-none")
    //console.log(videoEl);
    videoEl.muted =true ;
    videoEl.play();
}

function stopVideo(event) {
    let videoEl = event.target.querySelector('video');
    videoEl.classList.add("d-none")
    //console.log(videoEl);
    videoEl.muted =true ;
    videoEl.pause();
}

function showDetails(id) {
    location.href=`./details.html?id=${id}`
}