const mongoose=require('mongoose')


// -----------------------------------Budget Model------------------------------------------
const taskSchema = mongoose.Schema(
    {
      taskname: String,
      taskamt: String,
      completed: Boolean,
      userID: String
});

const taskModel=mongoose.model("alltasks",taskSchema)

module.exports={
    taskModel
}