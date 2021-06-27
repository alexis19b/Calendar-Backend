const express = require('express');
const { dbConection } = require('./database/confi');
const cors = require('cors');
require('dotenv').config();

// console.log(process.env);

//crear el servidor de express
const app = express();

//Base de datos
dbConection();

//CORS
app.use(cors());

//directorio publico
app.use( express.static('public') );

//lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );




//escuchar peticiones (puerto)

app.listen(process.env.PORT, ()=> {
  console.log (`Servidor corriendo en puerto ${ process.env.PORT }`);
}) 