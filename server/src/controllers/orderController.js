const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const orderItem = async (req, res) => {
  try {
    const { cart_id, user_id, shipping_address, totalAmount } = req.body;
    const orderedItems = new orderModel({
      cart_id: cart_id,
      user_id: user_id,
      shipping_address: shipping_address,
      totalAmount: totalAmount,
    });
    await orderedItems.save();
    res.status(201).json(orderedItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};
const getOrder = async (req, res) => {
  try {
    const getOrderedItem = await orderModel.find();
    res.status(201).json(getOrderedItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = { orderItem, getOrder };
