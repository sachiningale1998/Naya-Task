const express = require("express");
const cors = require("cors");
const connection = require("./db");
const authRouter = require("./routes/auth.routes")
require("dotenv").config();
const PORT = process.env.PORT

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter)


app.get("/", (req,res)=>{
    res.send("Welcome to backend home")
})

app.listen(PORT, async()=>{
    try{
        await connection ;
        console.log("connected to nayadrawboard database");
    }catch(e){
        console.log("error connecting to nayadrawboard database",e);
    }
})