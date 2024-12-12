const recipeRepository = require("../repository/recipeRepository");
const recipeModel = require("../model/Recipe");
const filterModel = require("../model/Filters");


exports.list = async () => {
  try {
    return (recipes = await recipeModel.find());
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.listById = async (id) => {
  try {
    return (recipe = await recipeModel.findById(id));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.listAllFilters = async () => {
  try {
    return (filters = await filterModel.find());
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.createFilters = async (filters) => {
  try {
    let newFilter = {
      type: filters.tipos,
      difficulty: filters.dificultad,
      category: filters.categorias,
      planType: filters.tipoPlan
    }
    return (filter = await filterModel.create(newFilter));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.create = async (recipe) => {
  try {
    return (recipes = await recipeModel.create(recipe));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.update = async (recipe) => {
  try {
    return (recipes = await recipeModel.findByIdAndUpdate(recipe._id, recipe));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
