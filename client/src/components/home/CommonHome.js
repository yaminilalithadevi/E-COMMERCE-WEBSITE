
import {React,useState,useEffect} from "react";
import axios from "axios";
import './home.css'
import {Link} from 'react-router-dom'
function Homepage({product}){
    
    const[products,setProducts]= useState([])


    const handleImageClick = () => {
        alert(' Please register first to see the details.')
           
       
      };
    
      

       useEffect( ()=>{
       axios.get("http://localhost:3001/product/")
      .then(products=> setProducts(products.data))
      .catch(err=> console.log(err))
       console.log(products)
        }, [products] )

    return(

<div>

<h1>welcome to homepage</h1>
 <div className="product-list">
     
      <div className="card"  onClick={handleImageClick} >

     

        {products.map(product => (
          <div key={product.id}  className="product-card">
           
            <img src={`/images/${product.image}`} alt={product.name} /> 
            
            <h3>{product.name}</h3>
            <p><b>Cost : </b> ₹{product.cost}</p>
            <p><b>Warranty : </b>{product.warranty}</p>
            <p className="rate"><b>Rating : </b> 
               <div className="box1">
                <h6>{product.rating} ⭐
                 </h6>
                </div>
                </p>
            
          </div>
        ))}
      </div>
    </div>
</div>
        

    )
}

export default Homepage;