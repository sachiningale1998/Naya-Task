const {Router} = require("express");

const UserModel = require("../models/UserModel");

const authRouter = Router();


authRouter.post("/signup", async (req, res) => {
   try{
    await UserModel.create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    res.json({ status: "ok"})

   }catch(err){
    console.log('err: ', err);
    res.json({ status: "error", error: "duplicate email" })
   }

})