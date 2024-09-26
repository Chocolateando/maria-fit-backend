const authService = require("../service/authService");
const validator = require('../util/validators')

exports.auth = async (req, res) => {
  try {
    let userData = req.body;
    if (!validator.isValidEmail(userData.correo)) throw ("El correo no cuenta con el formato correcto.");
    if (!validator.isValidPasswordString(userData.password)) throw("La contraseña no cumple con los requerimientos.");
    let data = await authService.auth(userData);
    if (data) res.status(201).send({ status: true, msg: "success", token: data });
    else res.status(401).send({ status: false, msg: "Credenciales incorrectos o usuario no registrado." });
  } catch (error) {
    res.status(500).send({success: false, msg: error.message ? error.message : error});
  }
};

exports.register = async (req, res) => {

  try {
    let userData = req.body;
    if (!validator.isValidEmail(userData.correo)) throw("El correo no cuenta con el formato correcto.");
    if (!validator.isValidPasswordString(userData.password)) throw("La contraseña no cumple con los requerimientos.");
    await authService.register(userData);
    res.status(200).send({success: true, msg: "Usuario registrado correctamente"});
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, msg: error.message ? error.message : error});
  }
  
}