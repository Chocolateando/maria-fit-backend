const mongoose = require("mongoose");

const Characteristics = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    }
  },
  { _id: false }
);

const PlanSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    cicleType: {
      type: String,
      required: true,
    },
    cicleNumber: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    characteristics: [Characteristics],
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", PlanSchema);
