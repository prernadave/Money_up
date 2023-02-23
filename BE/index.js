const express = require("express");
require('dotenv').config();
const cors = require("cors");
const { UserRouter } = require("./routes/Login_Sign_Up_Routes");
const { connection } = require("./config/db");
const {passport} = require("./config/google-outh");

const app = express();

app.use(express.json());
app.use(cors());


app.use("/user", UserRouter);



app.get("/", (req, res) => {
    res.send(`Route working Fine`);
});
app.get("/auth/google",passport.authenticate('google',{scope:['profile']}));

app.get("/auth/google/callback",passport.authenticate('google',{failureRedirect: '/login',session:false }),
function (req,res){
    res.redirect('/');
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