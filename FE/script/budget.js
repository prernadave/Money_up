let submitbtn=document.getElementById("submit-btn-butdget")
var count=1
submitbtn.addEventListener("click",(event)=>{
    event.preventDefault()
    let taskname=document.getElementById("ip-task-name")
    let amout=document.getElementById("ip-task-amt")
    if(taskname.value.length==0 || amout.value.length==0){
        alert("Fill the all section")
    }else{
        let completed=false
        let obj={
            taskname:taskname.value,
            taskamt:amout.value,
            completed:completed,
            data_id:count,
        }
        count++
        SaveData(obj)
    }
    
})

let midMainCont=document.getElementById("main-data-container")

function renderData(arr){
let allContent=arr.map((obj)=>{
 return `
<div class="main-task-div">
<ul class="main-task-ul">
    <div class="main-name-div">
        <input type="text" class="main-task-name" 
        data-id=${obj._id} 
        value=${obj.taskname} 
        readonly required>
    </div>
    <div class="main-amout-div">
        <input type="text" class="main-task-amount" 
        data-id=${obj._id} 
        value=${obj.taskamt} 
        readonly required>
    </div>
    <div class="main-edit-div" data-id=${obj._id} >
        <img class="main-task-edit" src="./budgetImages/edit_img.png" alt="edt" 
        data-id=${obj._id}
        >
    </div>
    <div class="main-delete-div">
        <img class="main-task-delete" src="./budgetImages/delete_img.png" alt="dlt" 
        data-id=${obj._id}
        >
    </div>
    <div class="main-btn-div">
        ${btnfunction(obj)}
    </div>
</ul>
</div>
 `
})

midMainCont.innerHTML=allContent.join(" ")
// allContent.join()
//   Editing section 

  let alleditbtn=document.querySelectorAll(".main-edit-div")

  for(let btn of alleditbtn){
    btn.addEventListener("click",(event)=>{ 
    let data_id = event.target.dataset.id;
    btn.innerHTML=``
    btn.innerHTML=`
    <img src="./budgetImages/save_img.png" alt=""  class="main-task-edit" data-id=${data_id}>
    `
    let nameip=document.querySelectorAll(".main-task-name")
    let amountip=document.querySelectorAll(".main-task-amount")
    let completedip=document.querySelectorAll(".main-task-completed")
    for(let i=0;i<nameip.length;i++){
        if(nameip[i].dataset.id==data_id){
            nameip[i].readOnly=false
            amountip[i].readOnly=false
            btn.addEventListener("click",()=>{
                let newnamevalue=nameip[i].value
                let newamoutvalue=amountip[i].value
                let newcompletedip=completedip[i].innerText
                if(newcompletedip=="No"){
                    newcompletedip=true
                }else{
                    newcompletedip=false
                }
                nameip[i].readOnly=true
                amountip[i].readOnly=true 
                btn.innerHTML=`
                <img src="./budgetImages/edit_img.png" alt=""  class="main-task-edit" data-id=${data_id}>
               `
               let newobj={
                taskname:newnamevalue,
                taskamt:newamoutvalue
               }
                updateData(newobj,data_id)
                window.location.reload();
            })
        }
    }

  });
}

//completed or not section
let allcompletedbtn=document.querySelectorAll
(".main-task-completed")
for(let btn of allcompletedbtn){
    btn.addEventListener("click",(event)=>{ 
        let data_id = event.target.dataset.id;
        let check=btn.innerText
        if(check=="No"){
        let checkval=confirm("Confirm your task is completed.")
        if(checkval){
             btn.innerText="Yes"
             btn.style.backgroundColor="green"
             let obj={
                completed:true
             }
             updateData(obj,data_id)
        }
        }else{
            btn.innerText="No"
            btn.style.backgroundColor="red"
            let obj={
                completed:false
            }
            updateData(obj,data_id)
        }
    })
}

//delete the particular task
let alldeletedbtn=document.querySelectorAll
(".main-task-delete")
for(let btn of alldeletedbtn){
    btn.addEventListener("click",(event)=>{ 
        let data_id = event.target.dataset.id;
        confirm("Task is going to delete permantaly")
        deletefunction(data_id)
        // window.location.reload();
    })
}

}


function btnfunction(obj){
  if(obj.completed==false){
    return `
    <button class="main-task-completed"  
    data-id=${obj._id} style="background-color:red">
     No
    </button>
    `
  }else{
    return `
    <button class="main-task-completed"  
    data-id=${obj._id} style="background-color:green">
     Yes
    </button>`
  }
  
}

function  rendertotal(totalamount){
    let allamt=document.getElementById("ip-amt-spent")
    allamt.value=totalamount
}


getAllData()
async function  getAllData(){
    try {
        let data=await fetch(`http://localhost:9168/budget/alltask`,{
            headers:{
                authorization:sessionStorage.getItem("email")
            }
        })
       if(data.ok){
        let temp=data.json()
        .then(res=>{
            let allTasks=res.allTasks
            let totalamount=res.totalamount
            // console.log(res)
           renderData(allTasks)
           rendertotal(totalamount)
        })
       }else{
        alert("not register")
       }
       } catch (error) {
        console.log(error)
       }
}

async function SaveData(obj){
    try {
        let data=await fetch("http://localhost:9168/budget/create",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "authorization":sessionStorage.getItem("email")
        },
        body:JSON.stringify(obj)
    })
    if(data.ok){
        alert("task created")
        getAllData()
    }else{
        console.log(data,data.error)
        alert("login first")
    }

    } catch (error) {
        console.log(error)
    }
} 

async function updateData(newobj,id){
    try {
        let data=await fetch(`http://localhost:9168/budget/update/${id}`,{
            method:"PATCH",
            headers:{
                "Content-type":"application/json",
                "Authorization":sessionStorage.getItem("email")
            },
            body:JSON.stringify(newobj)
        })
        if(data.ok){
            let msg=await data.json().then(
                res=>{
                    getAllData()
                }
            )
        }else{
            alert("you are note authorised")
        }

    } catch (error) {
        console.log(error)
    }
}

async function deletefunction(id){
    try {
        let data=await fetch(`http://localhost:9168/budget/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Authorization":sessionStorage.getItem("email")
            }
        })
        if(data.ok){
            let msg=await data.json().then(
                res=>{
                    getAllData()
                })
        }else{
            console.log(data)
            alert("you are note authorised")
        }

    } catch (error) {
        console.log(error)
    }
}