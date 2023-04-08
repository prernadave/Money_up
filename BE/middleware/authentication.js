// Do authentication here

const jwt=require("jsonwebtoken");
require("dotenv").config();
const{client}=require("../config/redis");

const authenticator=async(req,res,next)=>{
    
    // taking token from headers
     const token=await client.get(req.headers.authorization);
     if(token){
         const decoded=jwt.verify(token,process.env.key); //verifying
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