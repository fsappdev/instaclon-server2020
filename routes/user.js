const express = require("express");
const router = express.Router(); //creamos el "enrutador!"
const mongoose = require("mongoose");
const loginRequerido = require("../middleware/loginRequerido");
const postModel = mongoose.model("Post");
const userModel = mongoose.model("User")

router.get('/user/:id',loginRequerido,(req, res)=>{
   //return res.status(200).json({mens: 'exito'})
   userModel.findOne({_id:req.params.id})
   .select("-password")
   .then(user=>{
      postModel
      .find({posteadoPor:req.params.id})
      .populate("posteadoPor","_id name")
      .exec((err,posts) => {
         if(err){res.status(422).json({error:err})}
         res.status(200).json({user,posts})  
      })
   })
   .catch((err) => res.status(404).json({error: "Usuario no encontrado"}))
})

module.exports = router