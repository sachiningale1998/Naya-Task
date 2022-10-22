const {Router} = require("express");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/UserModel")

const authRouter = Router();


authRouter.post("/signup", async (req, res) => {
   try{
    await UserModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
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
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id
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
  console.log("user", user);
  if (user) {
    const token = jwt.sign(
      {
        name: req.body.name,
        email: req.body.email,
      },
      "sachin@7498"
    );
    return res.json({ status: "ok", user: token });
  } else {
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
      _id: user._id
    };
    return res.json({ status: "ok", user: getinfo });
  } else {
    return res.json({ status: "error", user: false });
  }
});

  module.exports = authRouter;