// * Importaciones
const express = require("express")
const app = express()
const cors = require("cors")
const connectDB = require("./config/db")

// * Middlewares - variables de entorno
require("dotenv").config()

// Base de datos
connectDB()

// ACTIVAR CORS - TRANSFERIR DATOS ENTRE ELLOS FLEXIBLE, ENTREGAR DATOS A REACT SIN RESTRICCIÓN
app.use(cors())

// Peticiones y retornos en formato JSON
app.use(express.json({ extended: true }))


// * Rutas
app.use("/api/obras", require("./routes/obras.js"))
app.use("/api/users", require("./routes/users.js"))
app.use("/api/auth", require("./routes/auth.js"))


// * Servidor
app.listen(process.env.PORT, () => {
    console.log("Servidor activo")
})