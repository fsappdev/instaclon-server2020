//models>user.js
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({//creamos el esquema
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   fotolink: {
      type: String,
      required: false,
      default: "https://res.cloudinary.com/developfsa/image/upload/v1616595686/user_default_wsqzrm.png"
   },
   misseguidores:[{type: ObjectId,
      ref:"User"}],
   siguiendoa:[{type:ObjectId,
      ref:"User"}],
})

mongoose.model("User", userSchema) //le damos nombre al modelo