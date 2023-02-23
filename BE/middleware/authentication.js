// Do authentication here

const jwt=require("jsonwebtoken");
require("dotenv").config();
const{client}=require("../config/redis");

const authenticator=async(req,res,next)=>{
    const token=await client.get(headers.Authorization.userID);
    if(token){
        const decoded=jwt.verify(token,process.env.key);
        if(decoded){
            req.body.userID=decoded.userID;
            next();
        }else{
            res.send("Please login first!");
        }
    }else{
        res.send("Please login first!");
    }
}


module.exports={
    authenticator
}