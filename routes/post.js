const express = require("express");
const router = express.Router(); //creamos el "enrutador!"
const mongoose = require("mongoose");
const postModel = mongoose.model("Post");
const LoginRequerido = require("../middleware/loginRequerido");

router.post("/crearpost", LoginRequerido, (req, res) => {
  //console.log(req.body);
  const { title, body } = req.body;
  if (!title || !body) {
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
  });
  post
    .save()
    .then((resultado) => res.json({ post: resultado }))
    .catch((err) => console.log(err));
});

router.get("/todoslosposts", (req, res) => {
  postModel
    .find()
    .populate("posteadoPor", "_id name")
    .then((posts) => res.json(posts))
    .catch((err) => error.log(err));
});

router.get("/misposts", LoginRequerido, (req, res) => {
  postModel
    .find({ posteadoPor: req.user._id })
    .populate("posteadoPor", "_id name")
    .then((misposts) => res.json(misposts))
    .catch((err) => error.log(err));
});
module.exports = router; //post.js routes
