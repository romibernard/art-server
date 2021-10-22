//* Importaciones
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("./../models/User")
const { validationResult } = require("express-validator")

// *Controllers
exports.loginUser = async (req, res) => {
    //validando el formulario:
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msgError: errors.array()
        })
    }

    //recabando datos del formulario
    const { email, password } = req.body
    try {
        //corroba que se tenga al usuario en la base de datos
        let foundUser = await User.findOne({ email })
        //validando al usuario:
        if (!foundUser) {
            return res.status(400).json({
                msgError: "El usuario o la contraseña son incorrectas."
            })
        }

        console.log("Usuario encontrado:", foundUser)
        //verificando contraseña:
        const verifiedPassword = await bcryptjs.compare(password, foundUser.hashedPassword)
        //si no coincide la contraseña...
        if (!verifiedPassword) {
            return res.status(400).json({
                msgError: "El usuario o el password son incorrectos"
            })
        }

        // entrega de credencial al token (si coincide)
        const payload = {
            user: {
                id: foundUser._id
            }
        }
        // "firma"
        jwt.sign(
            payload,
            process.env.SECRET, //de mi .env
            {
                expiresIn: 360000
            },
            (error, token) => {
                console.log(error)
                if (error) {
                    return res.status(401).json({
                        msgError: "Hubo un problema en la creación del token."
                    })
                }
                // Respuesta/entregando token
                return res.json({
                    data: {
                        token
                    }
                })
            }
        )
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msgError: "Hubo un problema creando el usuario."
        })
    }
}

//* Comprobando token
exports.verifyingToken = async (req, res) => {
    try {
        const userData = await User.findById(req.user.id).select("-hashedPassword")
        return res.json({
            data: {
                user: userData
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msgError: "Hubo un error en la búsqueda del usuario."
        })
    }
}