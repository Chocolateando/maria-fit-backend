const mongoose = require("mongoose");

const Ingredients = new mongoose.Schema({
    ingredientId: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    }
  },{ _id: false }
);

const Instructions = new mongoose.Schema(
  {
    orderNum: {
      type: Number,
      required: true,
    },
    instruction: {
      type: String,
      required: true,
    }
  },
  { _id: false }
);

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    portions: {
      type: Number,
      required: true,
    },
    preparationtime: {
      type: String,
      required: true,
    },
    ingredients: [Ingredients],
    instructions: [Instructions],
    tags: {
      type: String,
      required: true,
    },
    tipsAndTricks: [Instructions],
    image_url: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
