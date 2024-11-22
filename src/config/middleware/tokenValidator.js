require("dotenv").config();
const jwt = require('jsonwebtoken')
const userModel = require("../../model/User");


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

exports.validateAdmToken = async (req,res,next) => {

    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.KEY);
        if(verified.type != "-99") throw("No permitido");
        const user = await userModel.findById(verified.userCode);
        if(user.uType == null || user.uType != "-99") throw("No permitido");
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(401).json({error: 'Acceso denegado'})
    }
}

