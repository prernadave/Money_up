const express = require("express");
require("dotenv").config();
const { userModel } = require("../model/user-SignUP-Model");
// const { authenticator } = require("../middleware/authentication");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();



UserRouter.get("/", (req, res) => {
  res.send(`User Route`);
});



UserRouter.post("/register", async (req, res) => {
  const { email, name, password, mob_no, dob } = req.body;

  try {
    bcrypt.hash(password, +process.env.sRound, async (err, hash) => {
      

      if (err) {
        console.log({ message: err.message });
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
        res.send(`Register Sucessfull`);
      }
    });
    // console.log(hash)
  } catch (error) {
    console.log({ message: error.message });
    res.send({ message: error.message });
  }
});




UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let User = await userModel.findOne({ email });
    console.log(User);
    if (User) {
      bcrypt.compare(password, User.password, (err, result) => {
        if (result) {
          console.log(User._id);
          let token = jwt.sign(
            {
              userID: User._id,
            },
            process.env.key
            // { expiresIn: 60  }
          );

          
        //   res.cookie("token", token);
          
          res.send({ message: "Login Sucessfull", token: token });
        } else {
         
        //   console.log({ message: "Login Again" });
          res.send({ message: "Login Again" });
        }
      });
    } else {
      
    
      res.send({ message: "Login Again" });
    }
  } catch (error) {
    
    // logger.log(`error`, `error :-${error.message}`);
    
    res.send({ message: error.message });
  }
});


// UserRouter.get("/logout", async (req, res) => {
//   let token = req.cookies.token;
//   try {
//     if (token) {
//       await client.lPush("blackList", token);

//       res.send({ message: "Logout Sucesfull" });
//     } else {
//       res.send({ message: "Login Again" });
//     }
//   } catch (error) {
//     console.log({ message: error.message });
//     res.send({ message: error.message });
//   }
// });




module.exports = { UserRouter };
