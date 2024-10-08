const recipeService = require('../service/recipeService');

exports.list = async (req, res) => {
    try {
      const recipes = await recipeService.list();
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
    const recipe = await recipeService.listById(recipeId);
    res.status(200).send({success: true, data: recipe});
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, msg: error.message ? error.message : error});
  }
}

exports.listCategories = async (req, res) => {
  try {
    const categories = await recipeService.listCategories();
    res.status(200).send({success: true, data: categories});
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, msg: error.message ? error.message : error});
  }
}

exports.listDifficulty = async (req, res) => {
  try {
    const difficultyList = await recipeService.listDifficulty();
    res.status(200).send({success: true, data: difficultyList});
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, msg: error.message ? error.message : error});
  }
}

exports.create = async (req, res) => {
  try {
    const recipe = req.body;
    const saved = await recipeService.create(recipe);
    res.status(200).send({ success: true, id: saved.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: error.message ? error.message : error });
  }
};