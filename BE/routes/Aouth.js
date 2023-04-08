const { userModel } = require("../model/user-SignUP-Model")
const { passport } = require("../config/google-outh");
const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Oauth = express.Router();

Oauth.get("/google", passport.authenticate('google', { scope: ['profile', "email"] }));

Oauth.get("/google/callback", passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function (req, res) {
    let payload = req.user;
    try {
      bcrypt.hash(payload.password, +process.env.sRound, async (err, hash) => {
        if (err) {

          res.send({ message: err.message });
        } else {
          payload.password = hash;
          const User = new userModel(payload);
          await User.save();

        }
      });

    } catch (error) {


    }
    res.redirect('/');
  });

module.exports = { Oauth }