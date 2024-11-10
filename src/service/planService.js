const planModel = require("../model/Plan");

exports.list = async () => {
  try {
    return (plans = await planModel.find());
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.listById = async (id) => {
  try {
    return (recipe = await planModel.findById(id));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.create = async (plan) => {
  try {
    let newPlan = {
        type: plan.planTipo,
        price: plan.precio,
        currency: plan.moneda,
        cicleType: plan.cicloTipo,
        cicleNumber: plan.cicloFact,
        description: plan.descripcion,
        characteristics: plan.caracteristicas
    };
    return (plans = await planModel.create(newPlan));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
