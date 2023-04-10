let baseURL="https://busy-sock-fawn.cyclic.app"
// let baseURL="http://localhost:9168"

let loggedInUser = (sessionStorage.getItem("email"))
if(!loggedInUser){    
    window.location.assign("index.html");
}
getAllData()


let totalTasks=[]
let allAccounts=[]
let allCompTask=[]
let allUnTasksG=[]
async function getAllData(){
    try {
        let fetchingData=await fetch
        (`${baseURL}/newbudget/alltask`,{
            method:"GET",
            headers:{  
                "Content-Type":"application/json", 
                Authorization:sessionStorage.getItem("email")
            }
        })
        if(fetchingData.ok){
           let tempCheck=await fetchingData.json()
           totalTasks=tempCheck.allTasks
           allAccounts=tempCheck.allBanks
           let allUnTask=getAllTasksUn(tempCheck.allTasks)
           allCompTask=getAllTaskComp(tempCheck.allTasks)
           allUnTasksG=getAllTasksUn(tempCheck.allTasks)
           if(tempCheck.allBanks.length>0){
            renderAllTask(allUnTask,tempCheck.allBanks)
            renderBankAccountForFilter(tempCheck.allBanks)
           }else{
            renderBlank()
           }
          
        }else{
          console.log(temp)
        }
    } catch (error) {
        // alert('Server Error')
        console.log(error.message)
    }
}

function getAllTaskComp(data){
    let temp=[]
    for(let i=0;i<data.length;i++){
        if(data[i].completed==true){
            temp.push(data[i])
        }
    }
    return temp
}
function getAllTasksUn(data){
    let temp=[]
    for(let i=0;i<data.length;i++){
        if(data[i].completed==false){
            temp.push(data[i])
        }
    }
    return temp
}


function renderBlank(){
    let midCont=document.getElementById("main-mid-container")
    midCont.innerHTML=""
    let showComp=document.getElementById("comptaskatag")
    showComp.innerHTML=""
    showComp.innerHTML=`
    <p>You Didn't Created Any Account...</p>
    <p>For Creating Account <a href="./account.html"" id="clickhere">Click here...</a></p>

    `
}

let allTaskRenderMain=document.getElementById("all-task-render-main")

function renderAllTask(data,banks){
if(banks.length>0 && totalTasks.length<=0){
    let showCompdown=document.getElementById("changecomptask")
    showCompdown.innerHTML=""
    let showComp=document.getElementById("render-data")
    showComp.innerHTML=""
    showComp.innerHTML=`
    <p>You Didn't created any Task...</p>
    `
    renderFormData(data,banks)
}else{
allTaskRenderMain.innerHTML=""
let allTask=data.map((elem)=>{
    return `
        <div class="main-tasks">
            <p class="bank-name-task">${findBankAccount(elem.bankID,banks)}</p>
            <p class="task-name-task">${elem.taskname}</p>
            <p class="task-prize-task">${elem.taskprize}₹</p>
            <div class="up-btn-div">
            <button class="task-update-task" data-id=${elem._id}>Update</button>
            </div>
            <div class="up-btn-div">
            <button class="task-comp-task" 
            style="background-color:${selectColor(elem.completed)};" data-id=${elem._id}>${taskCompleted(elem.completed)}</button>
            </div>
        </div>
    `

})
renderFormData(data,banks)
allTaskRenderMain.innerHTML=allTask.join("")
let compButton=document.querySelectorAll(".task-comp-task")
compButton.forEach(elem=>{
    elem.addEventListener("click",(event)=>{
        let taskID=event.target.dataset.id
       let flag=event.target.childNodes[0].data
       if(flag=="No"){
        let temp=confirm("Confirm!Your Task is Completed or Not.")
        if(temp==1){
            flag=true
        }
       }else{
        swal("Task is already completed","Your are not able to change the status of task.","error")
       }
        let obj={
            completed:flag
        }
        updateData(taskID,obj)
    })
})

let getUpdattBtn=document.querySelectorAll(".task-update-task")
getUpdattBtn.forEach(elem=>{
    elem.addEventListener('click',(event)=>{
      let taskID=event.target.dataset.id
      getOneTask(taskID)
     
    })
})

}
}

async function getOneTask(id){
    try {
        let getTask=await fetch(`${baseURL}/newbudget/task/${id}`,{
        method:"GET",
        headers:{  
            Authorization:sessionStorage.getItem("email")
        },
    })
        if(getTask.ok){
            let task=await getTask.json()
            let taskData=task.task[0]
            if(taskData.completed){
               return await swal("Task is Already Completed","You are not able to update this task","error")
            }else{
                renderTaskForUpdate(taskData)
            }
        }else{
            console.log(getTask)
        }
    } catch (error) {
        alert('Server Error')
        console.log(error.message)
    }
    
}

function renderTaskForUpdate(taskData){
    let formrender=document.getElementById("budget-form")
    formrender.innerHTML=`
    <h1 id=create-taskt-title>Create a Task</h1>
            <form id="task-creat-form">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR7P5zOBSZxTrT-yxeyi8okKf6K3wu3ZijIw" alt="crate-task" id="create-task-img">
                    <p id="crt-task-bank">Select Bank Account</p>
                    <select name="accounts" id="crt-task-bank-acct" for="account">
                        
                         ${renderOptionsForUpdate(allAccounts,taskData)}
                    </select>
                    <p id="crt-task-name">Enter Task Name</p>
                    <input type="text" id="crt-task-nameip" placeholder="Enter task title here..."  for="taskname" value="${taskData.taskname}" required>
                    <p id="crt-task-prize">Enter Task Prize</p>
                    <input type="number" id="crt-task-prizeip" placeholder="Enter task prize here..."  for="prize" value="${taskData.taskprize}" required>
                    <button type="submit" id="crt-task-sbbtn">Submit</button>
                    <button id="crt-task-cabtn">Cancel</button>
                    
            </form>
    `

    let cancelForUp=document.getElementById("crt-task-cabtn")
    cancelForUp.addEventListener("click",(event)=>{
    //    renderAllTask(totalTasks,allAccounts)
        // window.location.reload()
        renderFormData(totalTasks,allAccounts)
    })
    let formtask=document.querySelector("form")
    formtask.addEventListener('submit',(event)=>{
        event.preventDefault()
        let bank=document.getElementById("crt-task-bank-acct").value
        let taskname=document.getElementById("crt-task-nameip").value
        let taskprize=document.getElementById("crt-task-prizeip").value
        let obj={
            bankID:bank,
            taskname:taskname,
            taskprize:taskprize,
        }

        updateCompTask(obj,taskData._id)
    })
}
function selectColor(flag){
// console.log('#ff5640')
if(flag==false){
    return '#ff5640'
}else{
    return '#23a455'
}
}
async function updateCompTask(obj,id){
    try {
        let updata=await fetch(`${baseURL}/newbudget/update/${id}`,{
        method:"PATCH",
        headers:{  
            "Content-Type":"application/json", 
            Authorization:sessionStorage.getItem("email")
        },
        body:JSON.stringify(obj)
    })
    if(updata.ok){
         await swal("Task Updated Successfully","Thank You","success")
        window.location.reload();
        }else{
            console.log(updata)
        }
    } catch (error) {
        console.log(error.message)
    }
    
}

async function updateData(id,obj){
try {
    let updata=await fetch(`${baseURL}/newbudget/update/${id}`,{
    method:"PATCH",
    headers:{  
        "Content-Type":"application/json", 
        Authorization:sessionStorage.getItem("email")
    },
    body:JSON.stringify(obj)
})
if(updata.ok){
     await swal("Task Completed.","Money Deducted from your bank account","success")
    window.location.reload();
    }else{
        console.log(updata)
    }
} catch (error) {
    alert('Server Error')
    console.log(error.message)
}

}

function renderFormData(data,banks){
    let formrender=document.getElementById("budget-form")
    formrender.innerHTML=renderForm(banks)
    let submitbutton=document.getElementById("crt-task-sbbtn")
    let cancelButton=document.getElementById("crt-task-cabtn")
    cancelButton.addEventListener('click',(event)=>{
        event.preventDefault()
        document.getElementById("crt-task-nameip").value=""
        document.getElementById("crt-task-prizeip").value=""
    })
    let formtask=document.querySelector("form")
    formtask.addEventListener('submit',(event)=>{
        event.preventDefault()
        let bank=document.getElementById("crt-task-bank-acct").value
       if(bank=="all"){
        alert("Select Bank Account")
       }else{
        let taskname=document.getElementById("crt-task-nameip").value
        let taskprize=document.getElementById("crt-task-prizeip").value
        let obj={
            bankID:bank,
            taskname:taskname,
            taskprize:taskprize,
        }
        createTask(obj)
       }
       
    })
}
async function createTask(obj){
    try {
        let fetchingData=await fetch
        (`${baseURL}/newbudget/create`,{
            method:"POST",
            headers:{  
                "Content-Type":"application/json", 
                Authorization:sessionStorage.getItem("email")
            },
            body:JSON.stringify(obj)
        })
        if(fetchingData.ok){
            await swal("Task Created Successfully","Thank You!","success")
            window.location.reload();
        }else{
          console.log("Server Error")
        }
    } catch (error) {
        alert('Server Error')
        console.log(error.message)
    }
}

function renderForm(banks){
    return `
    <h1 id=create-taskt-title>Create a Task</h1>
            <form id="task-creat-form">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR7P5zOBSZxTrT-yxeyi8okKf6K3wu3ZijIw" alt="crate-task" id="create-task-img">
                    <p id="crt-task-bank">Select Bank Account</p>
                    <select name="accounts" id="crt-task-bank-acct" for="account">
                    <option value="all">Show All Accounts</option>    
                        ${renderOptions(banks)}
                    </select>
                    <p id="crt-task-name">Enter Task Name</p>
                    <input type="text" id="crt-task-nameip" placeholder="Enter task title here..."  for="taskname" required>
                    <p id="crt-task-prize">Enter Task Prize</p>
                    <input type="number" id="crt-task-prizeip" placeholder="Enter task prize here..."  for="prize" required>
                    <button type="submit" id="crt-task-sbbtn">Submit</button>
                    <button id="crt-task-cabtn">Cancel</button>
                    
            </form>
    `

    
}

function renderOptions(data){
   let temp=data.map(elem=>{
    return `
    <option value="${elem._id}">${elem.name}</option>
    `
   })
   return temp.join("")
}

function renderOptionsForUpdate(allAccounts,taskData){
let main=[]
let temp=allAccounts.filter(elem=>{
    if(elem._id==taskData.bankID){
        return elem
    }
})

let temp2=allAccounts.filter(elem=>{
    if(elem._id!=taskData.bankID){
        return elem
    }
})

main=[...temp,...temp2]
let temp3=main.map(elem=>{
    return `
    <option value="${elem._id}">${elem.name}</option>
    `
   })
return temp3.join("")
}

function findBankAccount(bankID,banks){
  for(let i=0;i<banks.length;i++){
    if(bankID==banks[i]._id){
        return banks[i].name
    }
  }
}

function taskCompleted(flag){
    if(flag==true){   
        return 'Yes'
    }else{
        return 'No'
    }
}

let showComp=document.getElementById("comptaskatag")
showComp.addEventListener('click',(event)=>{
    let text=event.target.innerText
    if(text=="For Checkcing Completed Task Click Here..."){
        renderAllTask(allCompTask,allAccounts)
        showComp.innerText="For Checkcing Uncompleted Task Click Here..."
    }else{
        showComp.innerText="For Checkcing Completed Task Click Here..."
        renderAllTask(allUnTasksG,allAccounts)
    }
})


function renderBankAccountForFilter(data){
    console.log(data)
    let getFilterAcc=document.getElementById("bank-accounts-slct")
    getFilterAcc.innerHTML=`
    <option value="all">Show All Accounts</option>
    ${renderBankAccnt(data)}
    `
    getFilterAcc.addEventListener('change',(event)=>{
        let bankName=event.target.value
        console.log(bankName)
        if(bankName==="all"){
            renderAllTask(totalTasks,allAccounts)
        }else{
            let temp=totalTasks.filter(elem=>{
                if(elem.bankID==bankName){
                    return elem
                }
            })
            // console.log(temp)
            renderAllTask(temp,allAccounts)
        }
    })
}

function renderBankAccnt(data){
   let allAccts=data.map(elem=>{
    return `
    <option value="${elem._id}">${elem.name}</option>
    `
   })
   return allAccts.join("")
}


let searchCheck=document.getElementById("searchBox")
searchCheck.addEventListener('input',(event)=>{
    let searchWord=searchTask(event.target.value)
    renderAllTask(searchWord,allAccounts)
    
 })

 function searchTask(task){
    if(task=="all"){
        renderAllTask(totalTasks,allAccounts)
       }else{
        let temp=totalTasks.filter(function(elem){
            let ans=elem.taskname.toLowerCase().includes(task.toLowerCase())||
            elem.taskname.toLowerCase().includes(task.toLowerCase())
            return ans
        })
        return temp;
       }
 }