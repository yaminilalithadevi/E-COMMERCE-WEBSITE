const mongoose = require("mongoose");
const cartModel = require("./cartModel");
const userModel = require("./userModel");
const orderModel = new mongoose.Schema({
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: cartModel,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  },
  shipping_address: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("orders", orderModel);
