const express = require("express");
const cartController = require("../controllers/cartController");
const cartRouter = express.Router();
cartRouter.post("/addToCart", cartController.addToCart);
cartRouter.get("/getItem", cartController.getCartItem);
cartRouter.put("/updateItem", cartController.updateItem);
module.exports = cartRouter;
