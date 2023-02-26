const express = require("express");
require("dotenv").config();
const HomeRouter = express.Router()
const { Accountmodel } = require("../model/account.model");

HomeRouter.get("/", async (req, res) => {
    const allaccounts = await  Accountmodel.find();
    let loginuserID=""
    let fil=allaccounts.filter((item)=>{
      item.userID==loginuserID
    })
    res.send(allaccounts)
})

module.exports = {
    HomeRouter
}