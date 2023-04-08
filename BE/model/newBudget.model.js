const mongoose=require('mongoose')

const newTaskSchema = mongoose.Schema(
    {
     bankID:String,
     taskname:String,
     taskprize:String,
     completed:{type:Boolean,default:false},
     userID: String,
     createdDate:String,
     createdTime:String
});

const newTaskModel=mongoose.model("newTasks",newTaskSchema)

module.exports={
    newTaskModel
}