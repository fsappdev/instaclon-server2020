const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  //console.log(req);
  const { authorization } = req.headers; //extraemos la auth de los headers
  if (!authorization) {
    //sino existe retorna error
    return res
      .status(401)
      .json({ error: "1rst debes estar autenticado para seguir" });
  }
  //console.log(authorization);
  const token = authorization.replace("Bearer ", ""); //armamos la cadena del token bearear
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    //la libreria jwt permite verificar el token firmado
    if (err) {
      return res
        .status(401)
        .json({ error: "2nd debes estar autenticado para seguir" });
    }
    const { _id } = payload; //el payload de la verificacion nos devuelve el id del user que la firmo.
    User.findById(_id).then((userData) => {
      req.user = userData; //buscamos en la bd ese id, y CREAMOS una req nueva llamada user. con los datos del user.
      next(); //llamamos al siguiente middleware.PERO CUANDO TERMINE LA DE ENCONTRAR AL USER
      //ACÉ EXISTE UN PROBLEMA CON EL ASINCRONISMO.
    });
  });
}; //loginRequerido.js
