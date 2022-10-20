const express = require("express");
const connection = require("./db")
require("dotenv").config();
const PORT = process.env.PORT

const app = express();
app.use(express.json())


app.get("/", (req,res)=>{
    res.send("Welcome to backend home")
})

app.listen(PORT, async()=>{
    try{
        await connection ;
        console.log("connected to nayadrawboard database");
    }catch(e){
        console.log("error connecting to database",e);
    }
})