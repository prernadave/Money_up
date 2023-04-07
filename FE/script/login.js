


const baseURL = "https://busy-sock-fawn.cyclic.app";
let signupForm = document.querySelector(".signup-form form");
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let name = document.querySelector(".signup-name").value;
  let mob_no = document.querySelector(".signup-number").value;
  let email = document.querySelector(".signup-email").value;
  let password = document.querySelector(".signup-password").value;
  let dob=document.querySelector(".dob").value
  let obj = {
    email: email,
    name: name,
    mob_no: mob_no,
    dob: dob,
    password: password,
  };
  try {
    let res = await fetch(`${baseURL}/user/register`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
      });
      let data = await res.json();
      if (data.message === "User Register Sucessfull") {
          await swal("Signup Successful!", "You are now Registered!", "success");
         
          window.location.href="login.html"
          return;
      }else if(data.message === "User Register Sucessfull"){
        await swal("Signup failed!", "Email Registered Already!", "Error");
      }else{
          return await swal("Something Went Wrong.", "", "error");
      }
        

  } catch (error) {
    console.log(error);
    // alert("An error occurred. Please try again later.");
    return await swal("An error occurred. Please try again later.", "", "error");
  }
});


let login=document.querySelector(".login-form form")
login.addEventListener("submit", loginFun)

async function loginFun(event){
    event.preventDefault();

    let email= document.querySelector('.login-email').value;
    let password= document.querySelector('.login-password').value;
    let obj={
        email,
        password
    }
    let res= await fetch(`${baseURL}/user/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    let datares=await res.json()
    if(datares.message==="Login Sucessfull"){
        // console.log(datares.token)
        localStorage.setItem("token",datares.token)
            await  swal(
              "Welcome to MoneyUp","",
              "success"
            );
            sessionStorage.setItem("username",datares.name)
            sessionStorage.setItem("email",obj.email)
            window.location.href = "../home.html";

        return;
    }
    if(datares.message==="Wrong Password"){
        // return alert("Wrong Credentials")
        return await swal("Wrong Credentials", "", "error");
    }
    if(datares.message==="Sign Up First"){
    //    return alert("Create Your Account First")
       return await swal("Create Your Account First");
    }
    if(datares.message!=="Login Sucessfull"||datares.message!=="Sign Up First"||datares.message!=="Wrong Password"){
        return await swal("Something Went Wrong.", "", "error");
    }
}
 