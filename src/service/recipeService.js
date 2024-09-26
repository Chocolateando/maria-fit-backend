const recipeRepository = require('../repository/recipeRepository');

exports.list = async () => {
    try {
        return recipes = await recipeRepository.listAll();
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
}

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
            image_url: recipe.imagen
        }
        return recipes = await recipeRepository.save(newRecipe);
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
}