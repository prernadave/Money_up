const {userModel}=require("../model/user-SignUP-Model")
const {passport} = require("../config/google-outh");
const express = require("express");
require("dotenv").config();
// const { authenticator } = require("../middleware/authentication");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Oauth = express.Router();

Oauth.get("/google",passport.authenticate('google',{scope:['profile',"email"]}));

Oauth.get("/google/callback",passport.authenticate('google',{failureRedirect: '/login',session:false }),
function (req,res){
    let payload=req.user;
    try {
        bcrypt.hash(payload.password, +process.env.sRound, async (err, hash) => {
          if (err) {
            console.log({ message: err.message });
            res.send({ message: err.message });
          } else {
             payload.password=hash;
             const User = new userModel(payload);
            await User.save();
            // res.send(`Register Sucessfull`);
          }
        });
        // console.log(hash)
      } catch (error) {
        console.log({ message: error.message });
        // res.send({ message: error.message });
      }
    res.redirect('/');
});

module.exports={Oauth}