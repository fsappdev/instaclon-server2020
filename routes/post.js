const express = require("express");
const router = express.Router(); //creamos el "enrutador!"
const mongoose = require("mongoose");
const loginRequerido = require("../middleware/loginRequerido");
const postModel = mongoose.model("Post");
const LoginRequerido = require("../middleware/loginRequerido");

router.post("/crearpost", LoginRequerido, async (req, res) => {
  console.log(req.body);
   const { title, body, pic, ext } =  await req.body;
  console.log(title, body, pic, ext);
  if (!title || !body || !pic ) {
    return res
      .status(422)
      .json({ error: "por favor, rellene todos los campos" });
  }
  //console.log(req.user.email);
  //res.send("ok");
  req.user.password = undefined; //hacemos esto para no almacenar el pass en la bd.

  const post = new postModel({
    titulo: title,
    cuerpo: body,
    posteadoPor: req.user,
    foto: pic,
    extension: ext
  });
  post
    .save()
    .then((resultado) => res.json({ post: resultado }))
    .catch((err) => console.log(err));
});

router.get("/todoslosposts", LoginRequerido,(req, res) => {
  postModel
    .find()
    .populate("posteadoPor", "_id name")
    .then((posts) => {
      res.json(posts)
      console.log(posts);
    })
    .catch((err) => error.log(err));
});

router.get("/misposts", LoginRequerido, (req, res) => {
  postModel
    .find({ posteadoPor: req.user._id })
    .populate("posteadoPor", "_id name")
    .then((misposts) => res.json(misposts))
    .catch((err) => error.log(err));
});

router.puy("/like", loginRequerido, (req,res)=>{
  postModel.findByIdAndUpdate(req.body.PostId,{$push: {likes: req.user._id}},{new: true}).exec((err,result)=>{
    if(err){return res.status(422).json({error: err})}else{res.json(result)}
  })
})

router.puy("/dislike", loginRequerido, (req,res)=>{
  postModel.findByIdAndUpdate(req.body.PostId,{$pull: {likes: req.user._id}},{new: true}).exec((err,result)=>{
    if(err){return res.status(422).json({error: err})}else{res.json(result)}
  })
})
module.exports = router; //post.js routes
