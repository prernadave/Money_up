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
        renderData(obj)
    }
    
})

let midMainCont=document.getElementById("main-data-container")

function renderData(obj){

  let div=document.createElement("div")
  div.setAttribute("class","main-task-div")

  let ul=document.createElement("ul")
  ul.setAttribute("class","main-task-ul")


  let namediv=document.createElement("div")
  namediv.setAttribute("class","main-name-div")
  let name=document.createElement("input")
  name.setAttribute("class","main-task-name")
  name.setAttribute("data-id",`${obj.data_id}`)
  name.value=obj.taskname
  name.readOnly=true
  name.required=true
  namediv.append(name)

  let amountdiv=document.createElement("div")
  amountdiv.setAttribute("class","main-amout-div")
  let amount=document.createElement("input")
  amount.setAttribute('class',"main-task-amount")
  amount.setAttribute("data-id",`${obj.data_id}`)
  amount.value=obj.taskamt
  amount.readOnly=true
  amount.required=true
  amountdiv.append(amount)

  let editdiv=document.createElement("div")
  editdiv.setAttribute("class","main-edit-div")
  editdiv.setAttribute("data-id",`${obj.data_id}`)
  let editimg=document.createElement("img")
  editimg.setAttribute('class',"main-task-edit")
  editimg.setAttribute("data-id",`${obj.data_id}`)
  editimg.src="./budgetImages/edit_img.png"
  editdiv.append(editimg)

  let deletediv=document.createElement("div")
  deletediv.setAttribute("class","main-delete-div")
  let deleteimg=document.createElement("img")
  deleteimg.setAttribute('class',"main-task-delete")
  deleteimg.setAttribute("data-id",`${obj.data_id}`)
  deleteimg.src="./budgetImages/delete_img.png"
  deletediv.append(deleteimg)

  let completeddiv=document.createElement("div")
  completeddiv.setAttribute("class","main-btn-div")
  let completed=document.createElement("button")
  completed.setAttribute("class","main-task-completed")
  completed.setAttribute("data-id",`${obj.data_id}`)
  if(obj.completed==false){
    completed.innerText="No"
    completed.style.backgroundColor="red"
  }else{
    completed.innerText="Yes"
    completed.style.backgroundColor="green"
  }
  
  completeddiv.append(completed)

  ul.append(namediv,amountdiv,editdiv,deletediv,completeddiv)

  div.append(ul)

  midMainCont.append(div)


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
                    newcompletedip=false
                }else{
                    newcompletedip=true
                }
                nameip[i].readOnly=true
                amountip[i].readOnly=true 
                btn.innerHTML=`
                <img src="./budgetImages/edit_img.png" alt=""  class="main-task-edit" data-id=${data_id}>
               `
            //    window.location.reload();
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
            //  updatecompleted()
        }
        }
    })
}

//delete the particular task
let alldeletedbtn=document.querySelectorAll
(".main-task-delete")
for(let btn of alldeletedbtn){
    btn.addEventListener("click",(event)=>{ 
        let data_id = event.target.dataset.id;
        //  console.log(data_id)
        //deletefunction()
    })
}

}

