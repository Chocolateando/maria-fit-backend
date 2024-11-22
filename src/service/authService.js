const hash = require("../util/passwordHash");
const token = require("../util/jwtToken");
const userRepository = require("../repository/userRepository");
const userModel = require("../model/User");
const subscriptionModel = require("../model/Subscription");
const planModel = require("../model/Plan");


exports.auth = async function (userData) {
  try {
    let user = await userModel.findOne({ email: userData.correo });
    if (!user) throw "El correo ingresado no esta registrado.";
    const userExists = await hash.checkPassword(userData.password, user.password_hash);
    if (!userExists) return null;
    const subscription = await subscriptionModel.findOne({user: user._id});
    user.subscription_status = subscription ? subscription.subscription_status : "free";
    return token.generateToken(user);
  } catch (error) {
    console.log("No se  pudo autenticar el usuario: ", userData.correo);
    console.log(error);
    throw new Error(error);
  }
};

exports.register = async (userData) => {
  try {
    const userExists = await userModel.findOne({ email: userData.correo });
    if (userExists) throw "El correo ingresado ya existe.";
    const plan = await planModel.findOne({type: "Free", status: true});
    if (!plan) throw "El plan gratuito no se encuentra disponible.";
    const password = await hash.hashGenerator(userData.password);
    console.log(new Date().getTimezoneOffset() / 60);
    const fechaActual = new Date();
    const fechaFutura = new Date(fechaActual);
    fechaFutura.setDate(fechaFutura.getDate() + (30 * plan.cicleNumber));
    let newUser = {
      name: userData.nombre,
      lastname: userData.apellidos,
      birthday: userData.nacimiento,
      tall: userData.altura,
      weight: userData.peso,
      phone: userData.telefono,
      email: userData.correo,
      password_hash: password,
    };
    const user = await userModel.create(newUser);
    await subscriptionModel.create({
      user: user._id,
      plan: plan._id,
      initDate: fechaActual,
      endDate: fechaFutura,
    }); 
    console.log("Usuario creado correctamente con userId: ", user.id);
    return true;
  } catch (error) {
    console.log("No se  pudo crear el usuario: ", userData.correo);
    console.log(error);
    throw new Error(error);
  }
};
