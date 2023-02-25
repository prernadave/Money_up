// window.addEventListener("load",(event)=>{
//     let url="http://localhost:4040/land";
//     getProductsFunction(url);
// })


let add_account_btn=document.getElementById("add_form");

add_account_btn.addEventListener("submit",(event)=>{
    event.preventDefault();
    let obj={};
    let all_tags=document.querySelectorAll(".Ac");
    for(let i=0;i<all_tags.length;i++){
        obj[all_tags[i].id]=all_tags[i].value;
    }
    addAccountFunction(obj);
})


let addAccountFunction=async(obj)=>{
    try {
        let add_req=await fetch(`http://localhost:9168/accounts/create`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:sessionStorage.getItem("email")
            },
            body:JSON.stringify(obj)
        })
        if(add_req.ok){
            alert("New account is added");
        }else{
            alert("unable to add new account!");
        }
    } catch (error) {
        console.log(error.message);
        alert("unable to add new account!");
    }
};
