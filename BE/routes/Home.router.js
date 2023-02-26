const express = require("express");
const app = express();
app.use(express.json())
require("dotenv").config();
const HomeRouter = express.Router()
const { Accountmodel } = require("../model/account.model");
const { Enveloptmodel } = require("../model/envelop.model");

HomeRouter.get("/", async (req, res) => {
  const allaccounts = await Accountmodel.find();
  let loginuserID = ""
  let fil = allaccounts.filter((item) => {
    item.userID == loginuserID
  })
  res.send(allaccounts)
})
HomeRouter.get("/envelopesall", async (req, res) => {
  const allenvelope = await Enveloptmodel.find();
  let loginuserID = ""
  let fil = allenvelope.filter((item) => {
    item.userID == loginuserID
  })
  res.send(allenvelope)
})
HomeRouter.post("/envelopes", async (req, res) => {
  let payload = req.body;
  console.log(payload);
  const allenvelope = await new Enveloptmodel({
    "Envelope": payload.exprenses_name,
    "Bank_Name": payload.Bank_Name,
    "Acount_No": payload.Acount_No,
    "Time": payload.Time,
    "userID": "String"
  });
  allenvelope.save()
  let all = await Enveloptmodel.find()
  let loginuserID = ""
  // let fil=allenvelope.filter((item)=>{
  //   item.userID==loginuserID
  // })
  res.send(all)
})

module.exports = {
  HomeRouter
}