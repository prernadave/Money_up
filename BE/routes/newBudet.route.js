const express=require('express')
const {newTaskModel}=require("../model/newBudget.model")
const{Accountmodel}=require("../model/account.model");
const{authenticator}=require("../middleware/authentication");
const newBudgetRouter=express.Router()

newBudgetRouter.get("/alltask",authenticator,async(req,res)=>{
    try {
        let userID=req.body.userID
        let allTasks=await newTaskModel.find({userID:userID})
        let allBanks=await Accountmodel.find({userID})
        res.send({"allTasks":allTasks,"allBanks":allBanks})
    } catch (error) {
        console.log(error.message)
        res.status(401).send({msg:"server error"})
    }
})

newBudgetRouter.get("/task/:id",authenticator,async(req,res)=>{
    try {
        let taskID=req.params.id
        let task=await newTaskModel.find({_id:taskID})
        res.send({"task":task})
    } catch (error) {
        console.log(error.message)
        res.status(401).send({msg:"server error"})
    }
})

newBudgetRouter.get("/bank/:id",authenticator,async(req,res)=>{
    try {
        let bankID=req.params.id
        let bank=await Accountmodel.find({_id:bankID})
        res.send({"bank":bank})
    } catch (error) {
        console.log(error.message)
        res.status(401).send({msg:"server error"})
    }
})


newBudgetRouter.post('/create',authenticator,async(req,res)=>{
    try {
        req.body.createdDate=get_date()
        req.body.createdTime=get_time()
        let newTask=new newTaskModel(req.body)
        await newTask.save()
        res.send({msg:"Task Created Successfull"})
    } catch (error) {
        console.log(error.message)
        res.status(401).send({msg:"server error"})
    }
})

function get_date(){
    let date= new Date();
    var year = date.getFullYear();
    var mes = date.getMonth()+1;
    var dia = date.getDate();
    var today =dia+"-"+mes+"-"+year;
    return today;
}
function get_time(){
    let date= new Date();    
    let hours= date.getHours();
    let mins= date.getMinutes();
    let sec= date.getSeconds();
    var time = hours+":"+mins+":"+sec;
    return time;
}

newBudgetRouter.patch("/update/:id",authenticator,async(req,res)=>{
   try {
    let newData=req.body
    let taskID=req.params.id
    let userID=req.body.userID
    if(newData.completed==true){
        let tempTaskData=await newTaskModel.findById({_id:taskID})
        let tempBankID=tempTaskData.bankID
        let tempTaskPrize=+tempTaskData.taskprize
        let tempUpdateAccountTotal=await Accountmodel.findById({_id:tempBankID})
        let newBalance=tempUpdateAccountTotal.balance-tempTaskPrize
        await Accountmodel.findByIdAndUpdate({_id:tempBankID},{balance:newBalance})
    }
    await newTaskModel.findByIdAndUpdate({_id:taskID},newData)
    res.send({msg:"Task is Updated Successfull"})
   } catch (error) {
    console.log(error.message)
    res.status(401).send({msg:"server error"})
   }
})

newBudgetRouter.get('/account/balance/:id',authenticator,async(req,res)=>{
    try {
    let taskID=req.params.id
    let userID=req.body.userID
    let tempTaskData=await newTaskModel.findById({_id:taskID})
    let tempBankID=tempTaskData.bankID
    let tempTaskPrize=+tempTaskData.taskprize
    let tempUpdateAccountTotal=await Accountmodel.findById({_id:tempBankID})
    let newBalance=tempUpdateAccountTotal.balance-tempTaskPrize
    if(newBalance<0){
        res.send({flag:false})
    }else{
        res.send({flag:true})
    }
        
    } catch (error) {
        console.log(error.message)
    res.status(401).send({msg:"server error"})
    }
    
})

newBudgetRouter.delete('/delete/:id',authenticator,async(req,res)=>{
    try {
        let taskID=req.params.id
        await newTaskModel.findByIdAndDelete({_id:taskID})
        res.send({"msg":"Task Deleted successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(401).send({msg:"server error"})
    }
})

newBudgetRouter.get("/bankaccount/task/:id",authenticator,async(req,res)=>{
    try {
        let bankID=req.params.id
        let allTask=await newTaskModel.find({bankID})
        res.send({"msg":`All task of bank`,allTask:allTask})
    } catch (error) {
        console.log(error.message)
        res.status(401).send({msg:"server error"})
    }
})

newBudgetRouter.get("/bankaccount/total/:id",authenticator,async(req,res)=>{
    try {
        let bankID=req.params.id
        let allTask=await newTaskModel.find({bankID})
        let total=0
        for(let i=0;i<allTask.length;i++){
            total=total+(+allTask[i].taskprize)
        }
        console.log(total)
        res.send({"msg":`All task of bank`,total:total})
       
    } catch (error) {
        console.log(error.message)
        res.status(401).send({msg:"server error"})
    }
})

newBudgetRouter.get("/bankaccount",authenticator,async(req,res)=>{
    let userID=req.body.userID
    try {
        let allBanks=await Accountmodel.find({userID})
        res.send({allBanks:allBanks})
    } catch (error) {
        console.log(error.message)
        res.status(401).send({msg:"server error"})
    }
})

module.exports={
    newBudgetRouter
}