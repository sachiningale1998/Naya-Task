const {Router} = require("express");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/UserModel")

const authRouter = Router();


authRouter.post("/signup", async (req, res) => {
   try{
    await UserModel.create({
      givenName: req.body.givenName,
      familyName: req.body.familyName,
      fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        googleId: req.body.googleId,
        imageUrl: req.body.imageUrl
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


authRouter.post("/info", async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email
  });
  if (user) {
    console.log("userininfobackend", user);
    const getinfo = {
      givenName: user.givenName,
      familyName: user.familyName,
      email: user.email,
      _id: user._id,
      imageUrl: user.imageUrl
    };
    return res.json({ status: "ok", user: getinfo });
  } else {
    return res.json({ status: "error", user: false });
  }
});

authRouter.post("/googlelogin", async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });
  if (user) {
    const token = jwt.sign(
      {
        email: req.body.email
      },
      "sachin@7498"
    );
    return res.json({ status: "ok", user: token });
  } 
  else {
    return res.json({ status: "error", user: false });
  }
});

authRouter.post("/googleinfo", async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });
  if (user) {
    console.log("userininfobackend", user);
    const getinfo = {
      name: user.name,
      email: user.email,
      _id: user._id,
    };
    return res.json({ status: "ok", user: getinfo });
  } else {
    return res.json({ status: "error", user: false });
  }
});

  module.exports = authRouter;