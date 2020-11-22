//models>user.js
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
  //creamos el esquema
  titulo: {
    type: String,
    required: true,
  },
  cuerpo: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
    default: "sin foto",
  },
  posteadoPor: {
    type: ObjectId,
    ref: "User",
  },
});

mongoose.model("Post", postSchema); //le damos nombre al modelo
