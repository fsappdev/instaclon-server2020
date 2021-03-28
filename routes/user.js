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
   .catch((err) => res.status(404).json({error: err + "Usuario no encontrado"}))
})

router.put('/seguir',loginRequerido,(req,res) => {
   userModel.findByIdAndUpdate( //comienza acá
      req.body.seguirId,
      {$push:{misseguidores:req.user._id}}, //envio mi id para actualizar la lista de la persona que quiero seguir.
      {new:true},
      (err, result) => {
         //if(err){return res.status(422).json({error:err})}
         err ? res.status(422).json({error: err}) : null
         userModel.findByIdAndUpdate( //comienza acá
            req.user._id,
            {$push:{siguiendoa: req.body.seguirId}},//envio el id para actualizar MI lista con las personas a las que sigo.
            {new:true})
            .select("-password")
            .then(result=>res.json(result))
            .catch(err=> res.status(422).json({error:err}))
      })   
})

router.put('/noseguir',loginRequerido,(req,res) => {
   userModel.findByIdAndUpdate( //comienza acá
      req.body.noseguirId,
      {$pull:{misseguidores:req.user._id}}, //envio mi id para actualizar la lista de la persona que quiero seguir.
      {new:true},
      (err, result) => {
         //if(err){return res.status(422).json({error:err})}
         err ? res.status(422).json({error: err}) : null
         userModel.findByIdAndUpdate( //comienza acá
            req.user._id,
            {$pull:{siguiendoa: req.body.noseguirId}},//envio el id para actualizar MI con las personas a las que sigo.
            {new:true})
            .select("-password")
            .then(result=>res.json(result))
            .catch(err=> res.status(422).json({error:err}))
      })   
})

router.put('/updatefoto',loginRequerido, (req,res) => {
   console.log(req.body)
   userModel.findByIdAndUpdate(
      req.user._id,
      {$set:{fotolink: req.body.fotolink}},
      {new:true},
      (err, result) => {
         if(err){
            return res.status(422).json({error: 'no se puede enviar la imagen'})   
         }
         res.json(result)
      }
   )
      /* .select("-password")
      .then(result=>res.json(result))
      .catch(err=> res.status(422).json({error:err})) */
      /* const actualizar = userModel.where({_id:req.body.id})
      actualizar
         .update({$set: {fotolink: req.body.fotolink}})
         .updateOne()
         .exec()
         .select("-password")
         .then(result=>res.json({contenido : result, mensaje : 'éxito'}))
         .then(res.status(200).json({mens: 'foto de perfil actualizada correctamente'}))
         .catch(err=> res.status(422).json({error:err})) */
})


module.exports = router

