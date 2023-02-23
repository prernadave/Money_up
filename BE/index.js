const express = require("express");
require('dotenv').config();
const cors = require("cors");
const { UserRouter } = require("./routes/Login_Sign_Up_Routes");
const { connection } = require("./config/db");
<<<<<<< HEAD
const {passport} = require("./config/google-outh");

=======
const {Oauth}= require("./routes/Aouth")
// console.log(passport)
>>>>>>> a0a7401efbf44b31a7987dd5c27eacd7ddb452a2
const app = express();

app.use(express.json());
app.use(cors());


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