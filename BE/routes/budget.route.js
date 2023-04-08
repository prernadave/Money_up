// --------------------------------------------Requiring all the imp packages----------------------------------------
const express=require('express')
const {taskModel}=require("../model/budget.model")
const{authenticator}=require("../middleware/authentication");
const budgetRouter=express.Router()



// -------------------------------------------------CRUD OPERATIONS------------------------------------------------------

// BUDGET ROUTER FOR GETTING ALL THE TASK
budgetRouter.get('/alltask',authenticator,async(req,res)=>{
    try {
        let userID=req.body.userID
        let allTasks=await taskModel.find({userID:userID})
        let total=0
        if(allTasks.length>0){                            //finding total task amount 
            for(let i=0;i<allTasks.length;i++){
                total+= +(allTasks[i].taskamt)
            }
        }else{
            total=00
        }
        res.status(200).send({"allTasks":allTasks,"totalamount":total})
    } catch (error) {
       
        res.status(400).send({"msg":"Server Error"})
    }
})



// BUDGET ROUTER FOR CREATING NEW TASK
budgetRouter.post('/create',authenticator,async(req,res)=>{
    try {
        let userID=req.body.id
        let task=req.body
        let newTask=new taskModel(task)
        await newTask.save()
        let allTasks=await taskModel.find({userID:userID})
        let total=0                                                   //finding total task amount 
            for(let i=0;i<allTasks.length;i++){
                total+= +(allTasks[i].taskamt)
            }

        res.status(200).send({"msg":"Task created successfully","total":total})
    } catch (error) {
        
        res.status(400).send({"msg":"Server Error"})
    }
})


// BUDGET ROUTER FOR UPDATING TASK BY ID
budgetRouter.patch("/update/:id",authenticator,async(req,res)=>{
    try {
        let taskId=req.params.id
        let taskData=req.body
        let userID=req.body.userID
        await taskModel.findByIdAndUpdate({_id:taskId},taskData)
        let allTasks=await taskModel.find({userID:userID})
        let total=0
            for(let i=0;i<allTasks.length;i++){                                        //finding total task after updation
                total+= +(allTasks[i].taskamt)
            }
        res.status(200).send({"msg":"Task updated successfully","total":total})
    } catch (error) {
        
        res.status(400).send({"msg":"Server Error"})
    }
})


// BUDGET ROUTER FOR DELETION BY ID
budgetRouter.delete("/delete/:id",authenticator,async(req,res)=>{
    try {
        let taskId=req.params.id
        let findtask=await taskModel.findOne({_id:taskId})
        let userID=findtask.userID
        await taskModel.findByIdAndDelete({_id:taskId})
        let allTasks=await taskModel.find({userID:userID})
        let total=0                                                                      //finding total task after deletion
            for(let i=0;i<allTasks.length;i++){
                total+= +(allTasks[i].taskamt)
            }
        res.status(200).send({"msg":"Task Deleted successfully","total":total})
    } catch (error) {
       
        res.status(400).send({"msg":"Server Error"})
    }
})


// EXPORTING BUDGET ROUTER
module.exports={
    budgetRouter
}