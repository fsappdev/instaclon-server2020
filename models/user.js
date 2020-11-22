//models>user.js
const mongoose = require('mongoose');
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
   }
})

mongoose.model("User", userSchema) //le damos nombre al modelo