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