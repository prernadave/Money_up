const express = require("express");       //express
require('dotenv').config();               //dotenv
const cors = require("cors");             //cors
const { connection } = require("./config/db");                        //MONGODB CONNECTION

// Routers

 //USER ROUTER
const { UserRouter } = require("./routes/Login_Sign_Up_Routes");    
const {passport} = require("./config/google-outh");

//BUDGET ROUTER
const {budgetRouter}=require("./routes/budget.route");

// OAUTH ROUTER
const {Oauth}= require("./routes/Aouth");

// ACCOUNT ROUTER
const{accountRouter}=require("./routes/account.router");

// HOME ROUTER
const{HomeRouter}=require("./routes/Home.router");

// NEW BUDGET ROUTER
const{newBudgetRouter}=require("./routes/newBudet.route");

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use("/user", UserRouter);                    //USER ROUTER
app.use("/budget",budgetRouter)                  //BUDGET ROUTER
app.use("/accounts",accountRouter);              //ACCOUNT ROUTER
app.use("/home",HomeRouter);                     //HOME ROUTER
app.use("/newbudget",newBudgetRouter)            //NEW BUDGET ROUTER
app.use("/user", UserRouter);                    //USER ROUTER
app.use("/auth",Oauth);                          //OAUTH

//HOME 
app.get("/", (req, res) => {
    res.send(`Route working Fine`);
});



//CONNECTING TO THE SERVER
app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log(`Connected To DB 🎉`)
    } catch (error) {
        console.log(error.message)
    }
  console.log(`Server is running at ${process.env.port}✅`);
});