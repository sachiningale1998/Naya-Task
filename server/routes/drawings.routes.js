const { Router } = require("express");

const DrawingModel = require("../models/DrawingModel");
const UserModel = require("../models/UserModel");

const drawingRouter = Router();

drawingRouter.get("/getUsers", async (req, res) => {
    const users = await UserModel.find();
    res.send(users)
})

drawingRouter.get("/drawings", async (req, res) => {
  const userId = req.params.userId;
  const drawings = await DrawingModel.find();
  res.send(drawings);
});


drawingRouter.post("/drawings", async (req, res) => {
  const userId = req.params.userId;
  let payload = {
    ...req.body,
    userId,
  };
  const drawing = await new DrawingModel(payload);
  drawing.save((err, success) => {
    if (err) {
      console.log('err: ', err);
      return res.status(500).send({
          message: "something went wrong while posting drwing ",
        });
    }
    const drawingId = success._id;
    res.send(success);
  });
});


drawingRouter.patch("/:userId/drawings/:_id", async (req, res, next) => {
  const drawing = await DrawingModel.findByIdAndUpdate(
    req.params._id,
    req.body,
    {
      update: true,
    }
  );
  if (!drawing) {
    return next(
      new ErrorResponse(`No drawing with that id of  ${req.params._id}`)
    );
  }
  res.status(200).json({ success: true, data: drawing });
});

drawingRouter.delete("/:userId/drawings/:_id", async (req, res) => {
  let drawing;
  try {
    drawing = await DrawingModel.findByIdAndDelete(req.params._id);
  } catch (error) {
    console.log("error: ", error);
  }
  res.send(drawing);
});

module.exports = drawingRouter;
