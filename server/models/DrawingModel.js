const mongoose = require('mongoose');

const drawingSchema = mongoose.Schema({
    userId: {type: String, required: true},
    canvasUrl: {type: String},
    givenName: {type: String},
    familyName: { type: String},
    color: {type: String}
})


const DrawingModel = mongoose.model("drawing", drawingSchema);

module.exports = DrawingModel