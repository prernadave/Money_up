const express = require("express");
require('dotenv').config();
const cors = require("cors");
const { UserRouter } = require("./routes/Login_Sign_Up_Routes");
const { connection } = require("./config/db");

const {passport} = require("./config/google-outh");

const {budgetRouter}=require("./routes/budget.route");
const {Oauth}= require("./routes/Aouth");
const{accountRouter}=require("./routes/account.router");
const{HomeRouter}=require("./routes/Home.router");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", UserRouter);

app.use("/budget",budgetRouter)

app.use("/accounts",accountRouter);
app.use("/home",HomeRouter);


app.use("/user", UserRouter);  
app.use("/auth",Oauth);
app.get("/", (req, res) => {
    res.send(`Route working Fine`);
});


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log(`Connected To DB`)
    } catch (error) {
        console.log(error.message)
    }
  console.log(`Server is running at ${process.env.port}`);
});