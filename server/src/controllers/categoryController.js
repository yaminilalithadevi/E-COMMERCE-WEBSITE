
const CategoryModel=require("../models/categoryModel")
const productModel = require("../models/productModel")
const insertCategory=async(req,res)=>{
    
        const {name,product_id}=req.body
        const product=await productModel.findById(product_id)
        if(!product){
            res.status(404).json({message:"product not found"})
        }
        const createCategory=new CategoryModel({
            product_id,
            name:name
        })
        try{
        await createCategory.save();
        res.json(createCategory)
    }catch(error){
        console.log(error)
        res.status(500).json("internal server error")
    }

}
const getCategory = async (req, res) => {
    try {
      const id = req.body.id;
      console.log(id)
      const getCategory = await CategoryModel.findById(id).populate({
        path: 'product_id', 
        model: 'products', 
      }).exec();
      console.log(getCategory)
  
      if (!getCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.status(200).json(getCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
// const getCategory=async(req,res)=>{
//     try{
//         const getProduct=await CategoryModel.find().populate("product_id").exec()
//         console.log(getProduct)
//         res.status(200).json(getProduct)
//     }catch(error){
//         console.log(error)
//         res.status(500).json({message:"internal server error"})
//     }
// }
module.exports={insertCategory,getCategory}
