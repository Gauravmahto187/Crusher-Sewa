import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    ratePerCuMetre: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
      default: "cubic metre",
    },
    stock: {
      type: Number,
      required: false,
      min: 0,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", materialSchema);

export default Material;
