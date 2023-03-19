// <================> Global <================>
const inputs =document.querySelectorAll('input');
const btnLogin=document.getElementById('btnLogin');
const form=document.querySelector('form');
let isValid=false;
// <================> When start <================>
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


// <================> Events <================>
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (isValid) {
        setForm()
    }
    
})

form.addEventListener('input' , function () {
    if (ValidationEmaile() &&ValidationPassowrd()) {
        isValid=true;
    }
    else{
        isValid=false;
    }
    
})
/////////////////////////////another answer aw bdl input blur


// inputs[2].addEventListener('input' , function () {
//     ValidationEmaile();
// })
// inputs[3].addEventListener('input' , function () {
//     ValidationPassowrd();
// })



// <================> Functions <================>
function setForm() {
   const user={
    
    email:inputs[0].value,
    password:inputs[1].value,
	
}
//console.log(user);
registerForm(user);
}

async function registerForm(userData) {
    const Api = await fetch(`https://sticky-note-fe.vercel.app/signin`, {
      method: "post",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      
    });
    const response = await Api.json();
     if (response.message === 'success') {
        localStorage.setItem('uToken' , response.token)
        location.href= './home.html'
     } else {
          document.getElementById('msg').innerHTML= response.message;
     }
    
    //console.log(response);
  };


// <================> Validation <================>


function ValidationEmaile() {
    const regexStyle =/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
     if (regexStyle.test(inputs[0].value)) {
        inputs[0].classList.add("is-valid");
        inputs[0].classList.remove("is-invalid");
        return true
     } else {
        inputs[0].classList.add("is-invalid");
        inputs[0].classList.remove("is-valid");
        return false
     }

}
function ValidationPassowrd() {
    const regexStyle =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
     if (regexStyle.test(inputs[1].value)) {
        inputs[1].classList.add("is-valid");
        inputs[1].classList.remove("is-invalid");
        return true
     } else {
        inputs[1].classList.add("is-invalid");
        inputs[1].classList.remove("is-valid");
        return false
     }

}
