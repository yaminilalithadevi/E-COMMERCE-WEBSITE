const mongoose = require("mongoose");
const userModel = require("./userModel");
const productModel = new mongoose.Schema({
  
  // user_id:{
  //    type:mongoose.Schema.Types.ObjectId,
  //    required:true,
  //    ref:userModel
  // },
  name: {
    type: String,
    required: false,
  },
  cost: {
    type: Number,
    // required: true,
  },
  description: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    required: false,
  },
  warranty: {
    type: String,
    // required: true,
  },

  image: {
  type: String,
 },
});
module.exports = mongoose.model("products", productModel);

// image: {
//   type:String,
//  },