function goback(){
    console.log('fduhfd')
    window.location.href="./home.html"
}
let profile_name=document.querySelector("#profile_name");
profile_name.innerText=sessionStorage.getItem('username')

let email=document.querySelector("#email");
email.innerText=sessionStorage.getItem('email')

let mob_no=document.querySelector("#mob_no");
mob_no.innerText=sessionStorage.getItem('mob_no')

let dob=document.querySelector("#dob");
dob.innerText=sessionStorage.getItem('dob');

