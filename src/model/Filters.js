const mongoose = require("mongoose");

const Type = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  { _id: false }
);

const Difficulty = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      }
    },
    { _id: false }
  );

const Category = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      }
    },
    { _id: false }
);

const PlanType = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      }
    },
    { _id: false }
  );


const FilterSchema = new mongoose.Schema(
  {
    name: {
        type: String,
      default: "Filters"
    },
    type: [Type],
    difficulty: [Difficulty],
    category: [Category],
    planType: [PlanType]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Filter", FilterSchema);
