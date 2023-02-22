let submitbtn=document.getElementById("submit-btn-butdget")
submitbtn.addEventListener("click",(event)=>{
    event.preventDefault()
    let taskname=document.getElementById("ip-task-name")
    let amout=document.getElementById("ip-task-amt")
    let completed=false
    let obj={
        taskname:taskname.value,
        taskamt:amout.value,
        completed:completed
    }
    renderData(obj)
})

let midMainCont=document.getElementById("main-data-container")

function renderData(obj){
    console.log(obj)
  let div=document.createElement("div")
  div.setAttribute("class","main-task-div")

  let ul=document.createElement("ul")
  ul.setAttribute("class","main-task-ul")


  let namediv=document.createElement("div")
  namediv.setAttribute("class","main-name-div")
  let name=document.createElement("input")
  name.setAttribute("class","main-task-name")
  name.value=obj.taskname
  name.readOnly=true
  name.required=true
  namediv.append(name)

  let amountdiv=document.createElement("div")
  amountdiv.setAttribute("class","main-amout-div")
  let amount=document.createElement("input")
  amount.setAttribute('class',"main-task-amount")
  amount.value=obj.taskamt
  amount.readOnly=true
  amount.required=true
  amountdiv.append(amount)

  let editdiv=document.createElement("div")
  editdiv.setAttribute("class","main-edit-div")
  let editimg=document.createElement("img")
  editimg.setAttribute('class',"main-task-edit")
  editimg.src="./budgetImages/edit_img.png"
  editdiv.append(editimg)

  let deletediv=document.createElement("div")
  deletediv.setAttribute("class","main-delete-div")
  let deleteimg=document.createElement("img")
  deleteimg.setAttribute('class',"main-task-delete")
  deleteimg.src="./budgetImages/delete_img.png"
  deletediv.append(deleteimg)

  let completeddiv=document.createElement("div")
  completeddiv.setAttribute("class","main-btn-div")
  let completed=document.createElement("button")
  completed.setAttribute("class","main-task-completed")
  completed.innerText="No"
  completeddiv.append(completed)

  ul.append(namediv,amountdiv,editdiv,deletediv,completeddiv)

  div.append(ul)

  midMainCont.append(div)

}