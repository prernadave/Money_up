const express = require("express");
require("dotenv").config();
const { userModel } = require("../model/user-SignUP-Model");


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();

const { client } = require("../config/redis");


UserRouter.get("/", (req, res) => {
  res.send(`User Route`);
});


UserRouter.post("/register", async (req, res) => {

  const { email, name, password, mob_no, dob } = req.body;
  let findEmail = await userModel.findOne({ email });
  if (findEmail) {
    res.send({ message: "You are aleady registered same emailID" });
  } else {
    try {
      bcrypt.hash(password, +process.env.sRound, async (err, hash) => {


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
          await User.save();
          res.send({ "message": `Register Sucessfull` });
        }
      });

    } catch (error) {

      res.send({ message: error.message });
    }
  }
});




UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let User = await userModel.findOne({ email: email });

    if (User) {
      bcrypt.compare(password, User.password, async (err, result) => {
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










module.exports = { UserRouter };
