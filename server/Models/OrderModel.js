const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const OrderSchema = new mongoose.Schema(
  {
    products: [{
      type: ObjectId,
      ref: "cart",
    }],
    address: String,
    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
    transactionId:{
      type:String
    },
    user: {
      type: ObjectId,
      ref: "user",
    },
    amount:Number,
    updated:Date
  },
  { timestamps: true }
);

const order = mongoose.model("order", OrderSchema);

module.exports = order;
