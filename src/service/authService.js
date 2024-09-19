require("dotenv").config();
const jwt = require('jsonwebtoken');
const authModel = require("../model/auth");
const userModel = require("../model/user")

exports.auth = async function (userData) {
  try {
    const isValidUser = await userModel.findOne({dni:userData.username});
    if(!isValidUser) throw("USUARIO NO REGISTRADO");
    else if(isValidUser.status == 0) throw("USUARIO BLOQUEADO");
    const user = await authModel.findOne({ username: isValidUser.userId, password: userData.password });
    if(!user) throw("CREDENCIALES INCORRECTAS");
    let token = jwt.sign({ userCode: user.userId, role: isValidUser.rol}, process.env.KEY, {expiresIn: '1d'});
    return { token };
  } catch (error) {
      return { error };
  }
};

exports.register = async (userData) => {
    try {
        let auth = await authModel.create({
            userId: userData.dni,
            username: userData.dni,
            password: userData.password
        })
        console.log("Credencial de usuario creado correctamente con userId: ", userData.dni);
        return true;
    } catch (error) {
        console.log("No se  pudo crear las credenciales del usuario con id: ",userData.dni);
        console.log(error);
       return error; 
    }
}