const hash = require("../util/passwordHash");
const token = require("../util/jwtToken");
const userRepository = require("../repository/userRepository");

exports.auth = async function (userData) {
  try {
    const user = await userRepository.findByEmail(userData.correo);
    if (!user) throw "El correo ingresado no esta registrado.";
    const userExists = await hash.checkPassword(userData.password, user.password_hash);
    if (!userExists) return null;
    else return token.generateToken(user);
  } catch (error) {
    console.log("No se  pudo autenticar el usuario: ", userData.correo);
    console.log(error);
    throw new Error(error);
  }
};

exports.register = async (userData) => {
  try {
    const userExists = await userRepository.findByEmail(userData.correo);
    if (userExists) throw "El correo ingresado ya existe.";
    const password = await hash.hashGenerator(userData.password);
    let newUser = {
      name: userData.nombre,
      lastname: userData.apellidos,
      age: userData.edad,
      tall: userData.altura,
      weight: userData.peso,
      phone: userData.telefono,
      email: userData.correo,
      password_hash: password,
      subscription_status: false,
    };
    const user = await userRepository.save(newUser);
    console.log("Usuario creado correctamente con userId: ", user.id);
    return true;
  } catch (error) {
    console.log("No se  pudo crear el usuario: ", userData.correo);
    console.log(error);
    throw new Error(error);
  }
};
