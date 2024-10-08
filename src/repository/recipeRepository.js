const pool = require("../../database");

exports.listCategories = async () => {
  try {
    const res = await pool.query("SELECT rc.name FROM recipe_categories rc");
    return res.rows;
  } catch (err) {
    throw new Error("Error al consultar a la BD: " + err.message);
  }
}

exports.listDifficulty = async () => {
  try {
    const res = await pool.query("SELECT rd.name FROM recipe_difficulty rd");
    return res.rows;
  } catch (err) {
    throw new Error("Error al consultar a la BD: " + err.message);
  }
}

exports.listAll = async () => {
  try {
    const res = await pool.query("SELECT * FROM recipes r WHERE r.status = $1", [1]);
    return res.rows;
  } catch (err) {
    throw new Error("Error al consultar a la BD: " + err.message);
  }
};

exports.listById = async (id) => {
  try {
    const res = await pool.query("SELECT * FROM recipes r WHERE r.id = $1 and r.status = $2", [id,1]);
    return res.rows[0];
  } catch (err) {
    throw new Error("Error al consultar a la BD: " + err.message);
  }
};

exports.save = async (recipe) => {
    try {
      const res = await pool.query(
        "INSERT INTO recipes (title, description, category, difficulty, portions, preparationtime, ingredients, instructions, tags, image_url)" +
          " VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [
          recipe.title,
          recipe.description,
          recipe.category,
          recipe.difficulty,
          recipe.portions,
          recipe.preparationtime,
          recipe.ingredients,
          recipe.instructions,
          recipe.tags,
          recipe.image_url
        ]
      );
      return res.rows[0];
    } catch (err) {
      throw new Error("Error al crear la receta: " + err.message);
    }
  };
