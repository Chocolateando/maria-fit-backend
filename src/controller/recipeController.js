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

exports.update = async (req, res) => {
  try {
    const recipe = req.body;
    const updated = await recipeService.update(recipe);
    res.status(200).send({ success: true, id: updated.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: error.message ? error.message : error });
  }
};

exports.filters = async (req, res) => {
  try {
    const filters = await recipeService.listAllFilters();
    res.status(200).send({success: true, data: filters});
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, msg: error.message ? error.message : error});
  }
}

exports.createFilters = async (req, res) => {
  try {
    const filters = req.body;
    const saved = await recipeService.createFilters(filters);
    res.status(200).send({ success: true, id: saved.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: error.message ? error.message : error });
  }
};