const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
//conjunto de errores/check de la ruta:
const { validationResult } = require("express-validator")
const User = require("./../models/User")

exports.createUser = async (req, res) => {
    // REVISIÓN DE VALIDACIONES
    const errors = validationResult(req) //al momento de hacer mis checks, busca la propiedad de los errores.
    console.log(errors)
    if (!errors.isEmpty) {
        return res.status(400).json({
            msgError: errors.array()
        })
    }

    // Datos del formulario p/usuario
    const { username, email, password } = req.body

    // Encriptando contraseña
    try {
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = await User.create({
            username,
            email,
            hashedPassword,
        })
        console.log(newUser)
        //Registro ok-> no tengo que hacer login
        //Autenticación - datos de la credencial:
        const payload = {
            user: {
                id: newUser._id
            }
        }
        // "firma" del servidor
        jwt.sign(
            payload, //datos de la credencial
            process.env.SECRET, //firma de mi env
            {
                expiresIn: 360000 //"cookie"
            },

            //Si falla el ingreso...
            (error, token) => {
                console.log(error)
                if (error) {
                    return res.status(401).json({
                        msgError: "Hubo un problema en la creación del token."
                    })
                }
                return res.json({
                    data: {
                        token
                    }
                })
            }
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msgError: "Hubo un problema creando el usuario."
        })
    }
}