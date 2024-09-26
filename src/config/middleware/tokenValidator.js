require("dotenv").config();
const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
exports.validateToken = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.KEY)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'Acceso denegado'})
    }
}

exports.validateAdmToken = (req,res,next) => {

    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.KEY);
        if(verified.role != "admin") throw("No permitido")
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(401).json({error: 'token no es válido'})
    }
}

