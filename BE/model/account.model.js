const mongoose=require("mongoose");

const accountSchema=mongoose.Schema({
    name:String,
    acc_no:Number,
    balance:Number,
    userID:String
})

const Accountmodel=mongoose.model("account",accountSchema);

module.exports={
    Accountmodel
}