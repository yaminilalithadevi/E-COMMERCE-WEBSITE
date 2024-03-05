const mongoose = require("mongoose");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const cartModel = new mongoose.Schema({
  product_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: productModel,
      required: true,
    },
  ],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// cartModel.pre('findOne', function (next) {
//     this.populate(product_id);
//     next();
// })

module.exports = mongoose.model("cart", cartModel);
