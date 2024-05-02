
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");




const addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    // Check if the user and product exist
    const user = await userModel.findById(user_id);
    const product = await productModel.findById(product_id);
    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }
    if (!product) {
      return res.status(404).json({ message: "Product not found in database" });
    }

    // Find the cart item for the user
    let cartItem = await cartModel.findOne({ user_id });

    if (cartItem) {
      // If the cart item already exists, check if the product is already in the cart
      const productIndex = cartItem.productQuantities.findIndex(item => String(item.product_id) === String(product_id));
      if (productIndex !== -1) {
        // If the product is already in the cart, update its quantity
        cartItem.productQuantities[productIndex].quantity = quantity;
      } else {
        // If the product is not in the cart, add it with the given quantity
        cartItem.productQuantities.push({ product_id, quantity });
      }
    } else {
      // If the cart item doesn't exist, create a new one with the product ID and quantity
      cartItem = new cartModel({
        user_id,
        productQuantities: [{ product_id, quantity }]
      });
    }

    await cartItem.save();
    console.log("Cart Item updated:", cartItem);
    return res.json({ message: "Quantity updated in cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCartItem = async (req, res) => {
  try {
    const cartItems = await cartModel.find().populate("productQuantities.product_id").exec();

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
