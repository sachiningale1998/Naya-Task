const {Router} = require("express");
const jwt = require("jsonwebtoken");

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

authRouter.post("/login", async (req, res) => {
    const user = await UserModel.findOne({
      email: req.body.email,
      password:req.body.password
    });
    console.log("user", user);
    if (user) {
      const token = jwt.sign(
        {
          firstName: req.body.firstName,
          email: req.body.email,
        },
        "sachin@123"
      );
      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", user: false });
    }
  });



  module.exports = authRouter;