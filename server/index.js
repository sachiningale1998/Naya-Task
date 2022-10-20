const express = require("express");

const app = express();

app.get("/", (req,res)=>{
    res.send("Welcome to backend home")
})

app.listen(8080, (req, res)=>{
    
})