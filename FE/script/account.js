
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
            getAccountFunction();
        }else{
            alert("unable to add new account!");
        }
    } catch (error) {
        console.log(error.message);
        alert("unable to add new account!");
    }
};


document.addEventListener("DOMContentLoaded",(event)=>{
    getAccountFunction();
})


let getAccountFunction=async()=>{
    try {
        let allData_req=await fetch(`http://localhost:9168/accounts`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:sessionStorage.getItem("email")
            }
        });
        if(allData_req.ok){
            let backendData= await allData_req.json();
            let accountData=backendData.accountData;
            let total=backendData.total;
            renderAccountFunction(accountData,total);
        }else{
            alert("unable to load!!");
        }
    } catch (error) {
        console.log(error.message);
        alert("unable to load!!");
    }
}


let renderAccountFunction=async(accountData,total)=>{
    document.getElementById("net_total").innerHTML=`<label>Net Total : </label>${total}`;
    let displayContainer=document.getElementById("render_container");
    displayContainer.innerHTML=null;
    let accountArr=accountData.map((item)=>{
        return`<div class="acc_box">
                   <div class="bnkname"><label>Bank : </label>${item.name}</div>
                   <div class="accno"><label>Account.No : </label>${item.acc_no}</div>
                   <div class="bal"><label>Balance : </label>${item.balance}</div>
                   <div class="boxbtns">
                       <button class="accbtn edit" data-id=${item._id}>Edit</button>
                       <button class="accbtn delete" data-id=${item._id}>Delete</button>
                   </div>
               </div>`;
    });
    displayContainer.innerHTML=accountArr.join("");

    let all_delete_btns=document.querySelectorAll(".delete");
    for(let delete_btn of all_delete_btns){
        delete_btn.addEventListener("click",(event)=>{
            let delete_id=event.target.dataset.id;
            deleteAccountFunction(delete_id);
        })
    }


    let all_edit_btns=document.querySelectorAll(".edit");
    for(let edit_btn of all_edit_btns){
        edit_btn.addEventListener("click",(event)=>{
            let edit_id=event.target.dataset.id;
            for(let edit_data of accountData){
                if(edit_data._id==edit_id){
                    displayContainer.innerHTML=
                    `<div class="outer-box acc_box">
                    <div id="edit_name" contentEditable="true">${edit_data.name}</div>
                    <div id="edit_acc_no" contentEditable="true">${edit_data.acc_no}</div>
                    <div id="edit_balance" contentEditable="true">${edit_data.balance}</div>
                    <button class="save accbtn">SAVE</button>
                    </div>`;
                }
            }
            let save_btn=document.querySelector(".save");
            save_btn.addEventListener("click",(event)=>{
                let edit_name=document.getElementById("edit_name").innerText;
                let edit_acc_no=document.getElementById("edit_acc_no").innerText;
                let edit_balance=document.getElementById("edit_balance").innerText;
                let edit_url=`http://localhost:9168/accounts/update/${edit_id}`;
                editReqNameFunction(edit_url,edit_name,edit_acc_no,edit_balance);
            })

        })
    }
}


let deleteAccountFunction=async(id)=>{
    try {
        let delete_req=await fetch(`http://localhost:9168/accounts/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                Authorization:sessionStorage.getItem("email")
            }
        })
        if(delete_req.ok){
            alert("account deleted");
            getAccountFunction();
        }else{
            alert("Unable to delete the account!");
        }
    } catch (error) {
        console.log(error.message);
        alert("Unable to delete the account!");
    }
}


let editReqNameFunction=async(url,name,acc_no,balance)=>{
    try {
        let req=await fetch(url,{
            method:"PATCH",
            headers : {
                "Content-Type" : "application/json",
                Authorization:sessionStorage.getItem("email")
            },
            body : JSON.stringify({"name":name,"acc_no":acc_no,"balance":balance})
        })
        if(req.ok){
            alert("account details successfuly updated");
            getAccountFunction();
        }
    } catch (error) {
        console.log(error.message);
        alert("unable to update account details");
    }
}

