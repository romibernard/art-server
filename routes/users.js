const express = require("express")
const router = express.Router()
const { check } = require("express-validator")

const usersController = require("./../controllers/usersController")

router.post("/create",
    [                                               
        check("username", "El nombre es obligatorio.").not().isEmpty(),
        check("email", "Agrega un email válido").isEmail(),
        check("password", "El password debe ser mínimo de 6 caracteres").isLength({ min: 4 }).not().isEmpty()
    ]
    , usersController.createUser)


module.exports = router