const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "category",
      required: true,
    },
    quantity: {
      type: Number,
    },
    photo: {
      // type: Buffer,
      type:String,
      
    },
    shipping: {
      type: Boolean,
    },
    sold:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

const product = mongoose.model("product", ProductSchema);

module.exports = product;
