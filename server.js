//requerimos lo necesario para el server
const cors = require('cors');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_URI } = require("./keys");
// requerimos en el server.js para conectar a la bd

//usamos .json() para que el serv. pueda recibir json ANTES QUE CUALQUIER OTRA RUTA
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //server.js
//
//habilitamos el uso de cors
app.use(cors())

//
//conectamos a la bd
//metodo de conexion 1
/* const conectarDB = async () => {
   await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
   });
}
conectarDB();
const connection = mongoose.connection;
connection.once('open', () => {
   console.log('Conectado a la BD async');
}); */
//
//metodo de conexion 2
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});
mongoose.set('useFindAndModify', false);
mongoose.connection.on("connected", () => {
  console.log("conectado a la bd PAPU");
});
mongoose.connection.on("error", (err) => {
  console.log("ha habido un error de conexión a la bd", err);
});
//
//

//vamos a registrar el esquema User de mongoose antes de usar las rutas que requieran este modelo de lo contrario no funciona.
require("./models/user");
require("./models/post");

//requerimos el/los archivos de las rutas
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");

//usamos las rutas
app.use(authRoute); //server.js
app.use(postRoute);
app.use(userRoute);
//

//un middleware sirve para ejecutar codigo entre las peticiones.
/* const customMiddleware = (req, res, next) => {
   console.log('se ejecutó un middleware')
   next()
} */

//agragando el middleware
//app.use(customMiddleware)

//rutas alternativas
/* app.get('/', (req, res) => {
   console.log('estamos en el home');
   res.send('hola mundo con node-')
})

app.get('/about', customMiddleware, (req, res) => {
   console.log('estamos en el about');
   res.send('hola desde about page')
}) */
//

//config. del puerto de escucha del sever
const PORT = process.env.PORT || 4000;

//ejecutando la app.
app.listen(PORT, () => {
  console.log("servidor corriendo en el puerto: ", PORT);
});
