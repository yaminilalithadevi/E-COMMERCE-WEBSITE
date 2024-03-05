
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    // Check if the user and product exist
    const user = await userModel.findById(user_id);
    const product = await productModel.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "User or product not found" });
    }

    // Check if the cart item already exists
    //   let cartItem = await cartModel({
    //     user_id: user_id,
    //     product_id: product_id,
    //   });

    //   if (cartItem) {
    //     cartItem.quantity += quantity;
    //   } else {
    // Create a new cart item
    cartItem = new cartModel({
      user_id: user_id,
      product_id: product_id,
      quantity: quantity,
    });
    await cartItem.save();
    console.log("Cart Item:", cartItem);
    res.json({ message: "Added to cart" });
    //   }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCartItem = async (req, res) => {
  try {
    const cartItems = await cartModel.find().populate("product_id").exec();

    console.log("Cart items:", cartItems);
    res.status(200).json(cartItems);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error retrieving cart items", error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { product_id, user_id, quantity } = req.body;
    const cartItem = await cartModel.findOne({
      user_id: user_id,
      product_id: product_id,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    console.log("cart item:", cartItem);
    res.json({ message: "Quantity updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addToCart, getCartItem, updateItem };
