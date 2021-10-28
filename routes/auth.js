const express = require("express")
const router = express.Router()
const authController = require("./../controllers/authController")
const authorization = require("./../middlewares/authorization")
const { check } = require("express-validator")


router.post("/login", [
    check("email", "Ingresa un email válido").isEmail().not().isEmpty(),
    check("password", "No enviaste un password adecuado.").not().isEmpty()
], authController.loginUser)


router.get("/verifyingtoken", authorization, authController.verifyingToken)

module.exports = router