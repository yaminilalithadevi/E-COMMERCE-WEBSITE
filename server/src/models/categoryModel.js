const mongoose=require("mongoose")
const productModel=require("../models/productModel")
const CategoryModel=new mongoose.Schema({
    id:{
        type:String,
        required:false,
    },
        name:{
        type:String,
        required:true,
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:productModel
    }
})
module.exports= mongoose.model("categories",CategoryModel)