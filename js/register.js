// <================> Global <================>
const inputs =document.querySelectorAll('input');
const btnRegister=document.getElementById('btnRegister');
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
    if (ValidationName(inputs[0]) && ValidationName(inputs[1]) && ValidationEmaile() &&ValidationPassowrd()&&ValidationAge()) {
        isValid=true;
    }
    else{
        isValid=false;
    }
    
})
/////////////////////////////another answer aw bdl input blur

// inputs[0].addEventListener('input' , function () {
//     ValidationName(inputs[0])
// })
// inputs[1].addEventListener('input' , function () {
//     ValidationName(inputs[1])
// })
// inputs[2].addEventListener('input' , function () {
//     ValidationEmaile();
// })
// inputs[3].addEventListener('input' , function () {
//     ValidationPassowrd();
// })
// inputs[4].addEventListener('input' , function () {
//     ValidationAge();
// })


// <================> Functions <================>
function setForm() {
   const user={
    first_name:inputs[0].value,
	last_name:inputs[1].value,
    email:inputs[2].value,
    password:inputs[3].value,
	age:inputs[4].value,
}
//console.log(user);
registerForm(user);
}

async function registerForm(userData) {
    const Api = await fetch(`https://sticky-note-fe.vercel.app/signup`, {
      method: "post",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      
    });
    const response = await Api.json();
     if (response.message === 'success') {
        location.href= './index.html'
     } else {
          document.getElementById('msg').innerHTML= response.errors?.email.message;
     }
    
    //console.log(response);
  };


// <================> Validation <================>

function ValidationName(input) {
    const regexStyle =/^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
     if (regexStyle.test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true
     } else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false
     }

}
function ValidationEmaile() {
    const regexStyle =/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
     if (regexStyle.test(inputs[2].value)) {
        inputs[2].classList.add("is-valid");
        inputs[2].classList.remove("is-invalid");
        return true
     } else {
        inputs[2].classList.add("is-invalid");
        inputs[2].classList.remove("is-valid");
        return false
     }

}
function ValidationPassowrd() {
    const regexStyle =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
     if (regexStyle.test(inputs[3].value)) {
        inputs[3].classList.add("is-valid");
        inputs[3].classList.remove("is-invalid");
        return true
     } else {
        inputs[3].classList.add("is-invalid");
        inputs[3].classList.remove("is-valid");
        return false
     }

}
function ValidationAge() {
    const regexStyle =/^([1-7][0-9]|80)$/;
     if (regexStyle.test(inputs[4].value)) {
        inputs[4].classList.add("is-valid");
        inputs[4].classList.remove("is-invalid");
        return true
     } else {
        inputs[4].classList.add("is-invalid");
        inputs[4].classList.remove("is-valid");
        return false
     }

}