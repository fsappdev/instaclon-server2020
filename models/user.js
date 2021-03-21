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
   misseguidores:[{type: ObjectId,
      ref:"User"}],
   siguiendoa:[{type:ObjectId,
      ref:"User"}],
})

mongoose.model("User", userSchema) //le damos nombre al modelo