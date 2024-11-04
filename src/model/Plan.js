const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
    CicleType: {
      type: String,
      required: true,
    },
    CicleNumber: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    characteristics: [
      {
        text: {
          type: String,
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", PlanSchema);
