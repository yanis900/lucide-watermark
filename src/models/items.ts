import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Object,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  svgData: {
    type: String,
    required: true,
  },
});

export const Item = mongoose.models.Item || mongoose.model("Item", itemSchema, "items");
