import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cart from '../cart/Cart'
import './home.css';

function ProductDisplay() {
    const [product, setProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState('');
    const [quantity, setQuantity] = useState(1); // Default quantity is 1

    const params = useParams();

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const result = await fetch(`http://localhost:3001/product/${params.id}`);
                const data = await result.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        getProductDetails();

        fetchUserData();

    }, [params.id]);


    const fetchUserData = async () => {
        const UserId = localStorage.getItem('UserDetails')
        setUserId(JSON.parse(UserId));
        console.log("userId", UserId)
    };

    const handleAddToCart = async () => {
        console.log("product", product, userId, quantity)


        if (product) {
            try {
                // Axios POST request
                const response = await axios.post('http://localhost:3001/cart/addToCart', {
                    user_id: userId._id,
                    product_id: product._id,
                    quantity: quantity, // Use dynamic quantity
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                // Check if response status is in the 200 range
                if (response.status >= 200 && response.status < 300) {
                    console.log("Product added to cart successfully!");
                } else {
                    console.error('Failed to add product to cart');
                }
            } catch (error) {
                console.error('Error adding product to cart:', error);
            }
        }
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="container">
            <h2>Product Details</h2>
            {product && (
                <div className="container2">
                    <div className="left-container">
                        <img className="images" src={`/images/${product.image}`} alt={product.name} />
                    </div>
                    <div className="right-container">
                        <p><b>Key:</b> {product.id}</p>
                        <p><b>Name:</b> {product.name}</p>
                        <p><b>Cost:</b> {product.cost}</p>
                        <p><b>Warranty:</b> {product.warranty}</p>
                        <p><b>Description:</b> {product.description}</p>
                        <p><b>Rating:</b> {product.rating}</p>
                        <div className="quantity-container">
                            <div className="container2">

                            <button style={{textAlign:"center"}} className="quantity-btn " onClick={handleDecrement}>-</button>
                            <span className="quantity" style={{marginTop:"5px",marginLeft:"15px",color:"white"}}>{quantity}</span>
                            <button className="quantity-btn" onClick={handleIncrement}  >+</button>
                         </div>
                           
                        </div>
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>

                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDisplay;
