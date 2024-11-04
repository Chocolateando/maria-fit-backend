const recipeRepository = require("../repository/recipeRepository");
const recipeModel = require("../model/Recipe");

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

exports.listCategories = async () => {
  try {
    return (categories = await recipeRepository.listCategories());
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.listDifficulty = async () => {
  try {
    return (difficultyList = await recipeRepository.listDifficulty());
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.create = async (recipe) => {
  try {
    let newRecipe = {
      title: recipe.titulo,
      description: recipe.descripcion,
      category: recipe.categoria,
      difficulty: recipe.dificultad,
      portions: recipe.porciones,
      preparationtime: recipe.tiempo,
      ingredients: recipe.ingredientes,
      instructions: recipe.instructions,
      tags: recipe.etiquetas,
      image_url: recipe.imagen,
    };
    return (recipes = await recipeModel.create(newRecipe));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
