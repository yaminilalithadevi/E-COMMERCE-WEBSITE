const express=require("express")
const categoryRouter=express.Router()
const categoryController=require("../controllers/categoryController")
categoryRouter.post("/insertCategory",categoryController.insertCategory)
categoryRouter.get("/getProduct",categoryController.getCategory)
module.exports=categoryRouter