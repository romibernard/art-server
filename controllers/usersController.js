const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")
const User = require("./../models/User")

exports.createUser = async (req, res) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty) {
        return res.status(400).json({
            msgError: errors.array()
        })
    }

    //form
    const { username, email, password } = req.body

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
        const payload = {
            user: {
                id: newUser._id
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
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