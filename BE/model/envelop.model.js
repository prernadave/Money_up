const mongoose=require("mongoose");

const EnvelopSchema=mongoose.Schema({
    Envelope:String,
    Bank_Name:Number,
    Acount_No:Number,
    Time:String,
    userID:String
})

const Enveloptmodel=mongoose.model("Envelopes",EnvelopSchema);

module.exports={
    Enveloptmodel
}