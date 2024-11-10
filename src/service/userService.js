const userModel = require("../model/User");
const subscriptionModel = require("../model/Subscription");
const planModel = require("../model/Plan");

exports.listById = async (id) => {
  try {
    const user = await userModel.findById(id)
    if (!user) throw "No se encontró al usuario.";
    const subscription = await subscriptionModel.findOne({user: user._id});
    if (!subscription) throw "El usuario no tiene una suscripción activa.";
    const planType = await planModel.findById(subscription.plan)
    if (!planType) throw "El usuario no tiene una suscripción activa.";
    const userResponse = {
        user: {
            id: user._id,
            name: user.name,
            lastname: user.lastname,
            birthday: user.birthday,
            tall: user.tall,
            weight: user.weight,
            phone: user.phone,
            email: user.email
        },
        subscription: {
            status: subscription.subscription_status,
            initDate: subscription.initDate,
            endDate: subscription.endDate
        },
        planType: {
            name: planType.type,
            cicleType: planType.cicleType,
            currency: planType.currency,
            amount: planType.price
        }
    }
    return userResponse;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};