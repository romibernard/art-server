const express = require("express")
const router = express.Router()
const authController = require("./../controllers/authController")
const authorization = require("./../middlewares/authorization")
const { check } = require("express-validator")

//Autenticación (rutas): entregar y verificar credenciales

// Login: Dar credenciales
// POST - AUTH : el usuario debe ser quien dice ser
router.post("/login", [
    check("email", "Ingresa un email válido").isEmail().not().isEmpty(),
    check("password", "No enviaste un password adecuado.").not().isEmpty()
], authController.loginUser)


//Comprobando el token - sin corrupciones y que concuerde
router.get("/verifyingtoken", authorization, authController.verifyingToken)

module.exports = router