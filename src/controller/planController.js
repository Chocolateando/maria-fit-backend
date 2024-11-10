const planService = require("../service/planService");

exports.list = async (req, res) => {
    try {
      const recipes = await planService.list();
      res.status(200).send({success: true, data: recipes});
    } catch (error) {
      console.log(error);
      res.status(500).send({success: false, msg: error.message ? error.message : error});
    }
}

exports.getById = async (req, res) => {
  try {
    const recipeId = req.query.id; 
    if (!recipeId) throw ("Parametros Incorrectos. id = ", recipeId);
    const recipe = await planService.listById(recipeId);
    res.status(200).send({success: true, data: recipe});
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, msg: error.message ? error.message : error});
  }
}


exports.create = async (req, res) => {
  try {
    const recipe = req.body;
    const saved = await planService.create(recipe);
    res.status(200).send({ success: true, id: saved.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: error.message ? error.message : error });
  }
};

exports.update = async (req, res) => {
    try {
      const recipe = req.body;
      const saved = await planService.create(recipe);
      res.status(200).send({ success: true, id: saved.id });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, msg: error.message ? error.message : error });
    }
  };