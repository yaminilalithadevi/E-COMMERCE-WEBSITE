const express = require("express");
const orderController = require("../controllers/orderController");
const orderRouter = express.Router();
orderRouter.post("/createOrder", orderController.orderItem);
orderRouter.get("/getOrder", orderController.getOrder);
module.exports = orderRouter;
