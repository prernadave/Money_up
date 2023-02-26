// const  baseURL  = require("./baseURL");
let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

let regBtn = document.querySelector(".reg-btn");
let logBtn = document.querySelector(".log-btn");

const baseURL = "http://localhost:9168";

let register_url = `${baseURL}/user/register`;
let loginurl = `${baseURL}/user/login`;


signup.addEventListener("click", () => {
  slider.classList.add("moveslider");
  formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
  slider.classList.remove("moveslider");
  formSection.classList.remove("form-section-move");
});

regBtn.addEventListener("click", () => {
  register();

  function register() {
    let obj = {
      name: document.querySelector(".name").value,
      email: document.querySelector("#emailID").value,
      dob: document.querySelector(".dob").value,
      number: document.querySelector(".number").value,
      password: document.querySelector("#passwordID").value,
    };
    console.log(obj);

    register_connect(obj);
  }

  async function register_connect(obj) {
    try {
      let res = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      let data = await res.json();
      if (data.message === "Register Sucessfull") {
        alert(data.message);
        //   window.location.href = "../index.html";
      }
    } catch (error) {
      console.log(error.message);
    }
  }
});







logBtn.addEventListener("click", () => {
  login();

  function login() {
    let obj = {
      email: document.querySelector("#email").value,

      password: document.querySelector("#password").value,
    };
    console.log(obj);
      login_connect(obj);
  }

  async function login_connect(obj) {
    try {
      let res = await fetch(loginurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      let data = await res.json();
      console.log(data);
    //   let login_token = data.token;

    //   let loggedinUser = data.logged_in_username;
    //   let loggedinemail = data.logged_in_email;
    //   let loggedinage = data.logged_in_age;
    //   let loggedinid = data.logged_in_id;

    //   localStorage.setItem("lid", loggedinid);
    //   localStorage.setItem("lname", loggedinUser);
    //   localStorage.setItem("lemail", loggedinemail);
    //   localStorage.setItem("lage", loggedinage);

    //   localStorage.setItem("token", login_token);
    //   console.log(data.token);
      // alert(data.message);

      if (data.message === "Login Sucessfull") {
        sessionStorage.setItem("email",data.email);
        sessionStorage.setItem("username",data.username);
        alert(data.message);
        window.location.href = "../home.html";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
    }
    

});
 