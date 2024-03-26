import React, { useState, useEffect } from "react";
//import axios from 'axios';
import { useParams } from 'react-router-dom';

import {Link} from 'react-router-dom';
//import Cart from '../cart/Cart';
import './home.css'
// index.js or App.js



function ProductDisplay( ) { // Assuming id is a prop passed to this component
    const [name, setProductName] = useState('');
    const [cost, setProductCost] = useState('');
    const [warranty, setProductWarranty] = useState('');
    const[description,setProductDescription]=useState('');
    const[rating,setProductRating]=useState('');
    const[id,setId] =useState('')
    const[file,setFile]=useState('')
    const params=useParams();

  

    useEffect(()=>{
        getProductDetails();
         },[])
  
         const getProductDetails = async () => {
          try {
            const result = await fetch(`http://localhost:3001/product/${params.id}`);
            const data = await result.json();
            console.log("Data=",data)
            
            setProductName(data.name);
            setProductCost(data.cost);
            setProductWarranty(data.warranty);
            setProductDescription(data.description);
            setProductRating(data.rating);
            setFile(data.image)
            setId(data._id)

            console.log('data', data);
            
            // setFile(data.file);
          } catch (error) {
            console.error('Error fetching product details:', error);
          }
        }
  
return (

       <div className="container">
           <h2>Product Details</h2>
            <div className="container2">
               <div className="left-container">
                  <img  className="images"  src={`/images/${file}`}   alt={name} /> 
                </div> 

                <div  className="right-container">
                  <p> <b> Name:</b> {name}</p>
                  <p> <b>Cost:</b>  {cost}</p>
                  <p> <b> Warranty: </b> {warranty}</p>
                  <p> <b>Description:</b> {description}</p>
                  <p><b>Rating:</b> {rating}</p>
                  <Link to={`/cart/${id}`}>  <button style={{ width: '25%' }}> Add To Cart</button></Link>
                 
                </div>
             
            </div>
        </div>
    );
}

export default ProductDisplay;
