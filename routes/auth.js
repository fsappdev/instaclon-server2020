const express = require("express");
const router = express.Router(); //creamos el "enrutador!"
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
//const loginRequerido = require("../middleware/loginRequerido");

router.get("/", (req, res) => {
  res.send("hola desde el home... via auth");
});
//ruta para registrarse en la aplicacion
router.post("/registrarse", (req, res) => {
  const { name, email, password } = req.body;
  //console.log(name, email, password);
  if (!email || !name || !password) {
    return res
      .status(422)
      .json({ error: `No se han enviado los datos completamente` });
  } else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (savedUser) {
          return res
            .status(422)
            .json({ error: `ya existe un user con ese email` });
        }
        //creamos el password encryptado
        bcrypt.hash(password, 12).then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword, //el pw encryptado
            name,
          });
          user
            .save() //guardamos en la bd de mongoDB
            .then((user) =>
              res.json({ message: "usuario creado exitosamente." })
            );
        });
      })
      //.then(user => res.json({ message: "usuario creado exitosamente." }))
      .catch((err) => console.log(err));
  }
});

router.post("/loguearse", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "Debe completar email y password" });
  }
  User.findOne({ email: email }).then((SavedUser) => {
    if (!SavedUser) {
      return res.status(422).json({ error: "Correo o Email incorrectos" });
    }
    //comparamos el pass en el caso de que exista el user
    bcrypt
      .compare(password, SavedUser.password) // comparamos el pass enviado con el almacenado en la bd
      .then((concuerda) => {
        if (concuerda) {
          //res.json({ message: "Usuario autenticado exitosamente" })
          const token = jwt.sign({ _id: SavedUser._id }, JWT_SECRET); //uso el id del user de la bd para crear el token junto con la clave secreta
          const { _id, name, email, siguiendoa, misseguidores } = SavedUser;
          res.json({token, user: { _id, name, email, siguiendoa, misseguidores }});
        } else {
          return res.status(422).json({ error: "Correo y/o Contraseña incorrectos" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

//usado para propositos de testeo unicamente.
/* router.get("/protegida",  (req, res) => {
  res.send("hola desde ruta protegida");
  //console.log(req);
}); */

module.exports = router; //auth.js
