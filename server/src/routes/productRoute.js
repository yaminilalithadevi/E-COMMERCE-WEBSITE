const express = require("express");
const router = express.Router();
//const multer=require("multer")
const product = require("../controllers/productControllers");

router.post("/create", product.upload.single('image'), product.createProduct);

router.put("/:id",product.upload.single('image'), product.updateProduct);
 //router.put("/:id",product.updateProduct)




router.get("/:id", product.getProduct);

router.get("/", product.getAllProduct);

//router.put("/:id", product.updateProduct);

router.delete("/:id", product.deleteProduct);


module.exports = router;

// const productModel = require("../models/productModel");

// class productService {
//   static async createProduct(name, cost, description, warrenty) {
//     try {
//       const params = new productModel({
//         name,
//         cost,
//         description,
//         warrenty,
//       });
//       console.log("the product is", params);
//       const createProduct = await params.save();
//       console.log(createProduct);
//       return createProduct;
//     } catch (error) {
//       console.log("the error is", `${error}`);
//     }
//   }

//   static async getProduct() {
//     try {
//       const findProduct = await productModel.find();
//       console.log(findProduct);
//       return findProduct;
//     } catch (error) {
//       console.log("the error is", `${error}`);
//     }
//   }

//   static async deleteProduct(){
//     try{
//       const deletedProduct=await productModel.findById(req.params.id);
//       const data=deletedProduct.deleteOne()
//       console.log("the deleted product is",deletedProduct)
//       console.log("the data is",data)
//       return deletedProduct;
//     }catch(error){
//       console.log("the error is",`${error}`)
//     }
//   }
// }
// module.exports = productService;
