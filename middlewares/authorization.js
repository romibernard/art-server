// descencriptando token y coincidencia con palabara secreta
// importaciones
const jwt = require("jsonwebtoken")

// función descencriptación
const unlockingToken = (req, res, next) => {
    const token = req.header("x-auth-token")
    if (!token) {
        return res.status(401).json({
            msgError: "No hay un token o es erróneo. Permiso no válido."
        })
    }

    try {
        const openToken = jwt.verify(token, process.env.SECRET)
        req.user = openToken.user
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msgError: "Se presentó un error en el proceso de token."
        })
    }
}

// exportación
module.exports = unlockingToken