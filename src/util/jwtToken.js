require("dotenv").config();
const jwt = require('jsonwebtoken');

exports.generateToken = (user) =>  {
    return jwt.sign({ userCode: user.id, status: user.subscription_status}, process.env.KEY, {expiresIn: '1d'});
}