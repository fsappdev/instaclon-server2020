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
  },
  extension: {
    type: String,
    required: false,
  },
  posteadoPor: {
    type: ObjectId,
    ref: "User",
  },
  likes: [{
    type: ObjectId,
    ref: "User",
  }],
  comentarios:[{
    text:String,
    posteadoPor: {type: ObjectId, ref: "User"}
  }]

});

mongoose.model("Post", postSchema); //le damos nombre al modelo
