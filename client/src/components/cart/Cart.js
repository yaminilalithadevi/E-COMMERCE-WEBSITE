import React, { useState, useEffect } from "react";
import { useCart } from '../CartContext';

function Cart( ) {
  const { cartItems, addToCart, updateCartItems } = useCart(); // Use addToCart and updateCartItems from context
console.log("cart itemssss",cartItems)

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/cart');
      if (response.ok) {
        const data = await response.json();
        updateCartItems(data); // Update cart items in context
      } else {
        console.error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/cart/addToCart/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        fetchCartItems(); // Refresh cart items after adding a new product
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div>
      <h1>This is Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item._id}>
            Product Name: {item.product.name}, Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      {/* Example button to add a product to the cart */}
      <button onClick={() => handleAddToCart()}>
        Add Product to Cart
      </button>
    </div>
  );
}

export default Cart;
