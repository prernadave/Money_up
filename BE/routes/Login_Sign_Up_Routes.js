// Importing all the necessary things
const express = require("express");
require("dotenv").config();
const { userModel } = require("../model/user-SignUP-Model");  //USER MODEL
const jwt = require("jsonwebtoken"); //JSON WEB TOKEN
const bcrypt = require("bcrypt");    //BCRYPT

// USER ROUTER
const UserRouter = express.Router();
// REDIS CLIENT
const { client } = require("../config/redis");



UserRouter.get("/", (req, res) => {
  res.send(`User Route`);
});

// ---------------------------------------------------------------REGISTRATION--------------------------------------------------------

UserRouter.post("/register", async (req, res) => {

  const { email, name, password, mob_no, dob } = req.body;
  let findEmail = await userModel.findOne({ email });
  if (findEmail) {                                                            //checking the user exsists or not in the database
    res.send({ message: "You are aleady registered same emailID" });
  } else {
    try {
      bcrypt.hash(password, +process.env.sRound, async (err, hash) => {        //hashing the password
        if (err) {
          res.send({ message: err.message });
        } else {
          const User = new userModel({
            email,
            name,
            password: hash,
            mob_no,
            dob,
          });
          await User.save();                                                    //saving the data in db
          res.send({ "message": `Register Sucessfull` });
        }
      });

    } catch (error) {

      res.send({ message: error.message });
    }
  }
});

// -----------------------------------------------------------------LOGIN-------------------------------------------------------------


UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let User = await userModel.findOne({ email: email });                     //finding user by email

    if (User) {
      bcrypt.compare(password, User.password, async (err, result) => {       //comparing the password
        if (result) {

          const token = jwt.sign({ userID: User._id, userName: User.name }, process.env.key); //{expiresIn:60}
          await client.SET(User.email, token);

          res.send({ message: "Login Sucessfull", email: User.email, username: User.name });
        } else {
          res.send({ message: "Login Again" });
        }
      });
    } else {
      res.send({ message: "Login Again" });
    }
  } catch (error) {

    res.send({ message: error.message });
  }
});


// exporting user router
module.exports = { UserRouter };


