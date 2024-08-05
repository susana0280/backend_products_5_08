const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { config } = require('dotenv')
config()

const productosRoutes = require('./routes/producto.routes')
const authRoutes=require('./routes/auth.routes')

// Usamos express para los middlewares 
const app = express();
app.use(bodyParser.json()) // Parseador de Bodies

//Acá conectaremos la base de datos:

mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME })
.then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB:', err));
const db = mongoose.connection;




//Routes

//autenticación
app.use('/users',authRoutes)

// api rest productos
app.use('/productos', productosRoutes)







const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`)
})