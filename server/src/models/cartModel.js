const mongoose = require("mongoose");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

const cartModel = new mongoose.Schema({
 


  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  },

  productQuantities: [{

  product_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: productModel,
      required: true,
    },
  ],

  quantity: {
    type: Number,
    required: true,
  },
   
  }]


});
module.exports = mongoose.model("cart", cartModel);
