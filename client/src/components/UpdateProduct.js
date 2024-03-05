
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import {useCallback} from 'react';

import axios from 'axios';

function UpdateProduct () {
  
    const [name, setProductName] = useState('');
    const [cost, setProductCost] = useState('');
    const [warranty, setProductWarranty] = useState('');
    const[description,setProductDescription]=useState('');
    const[rating,setProductRating]=useState('');
    const[file,setFile]=useState(null)
    const params=useParams();

    useEffect(()=>{
      getProductDetails();
       },[])

       const getProductDetails = async () => {
        try {
          const result = await fetch(`http://localhost:3001/product/${params.id}`);
          const data = await result.json();
          console.log(data)
          
          setProductName(data.name);
          setProductCost(data.cost);
          setProductWarranty(data.warranty);
          setProductDescription(data.description);
          setProductRating(data.rating);
          
          //setFile(data.file);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }

      
      
    const handleUpdate = async (e) => {
      e.preventDefault();
  
      console.log(name, cost, warranty, description, rating, file);
  
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('cost', cost);
        formData.append('warranty', warranty);
        formData.append('description', description);
        formData.append('rating', rating);
        formData.append('image', file);
        
        console.log(params.id)
        console.log(formData)
       
  
        await axios.put(`http://localhost:3001/product/${params.id}`,formData);
        
        alert('Your product is updated successfully');
      } catch (error) {
        console.error('Error updating product:', error);
      }
    };
  

// const handleUpdate = async ()=>{
//   console.log(name,cost,warranty,description,rating,file)


//     try {
//        await axios.put(`http://localhost:3001/product/${params.id}`, {name,cost,warranty,description,rating});
//         alert("Your product is updated successfully")
//         } catch (error) {
//        console.error('Error updating product:', error);
//     }}


return (
    <div className='innercontainer'>
    <h2>Update Product</h2>
    <form  >
      
      <label  id="labels">Name           
      <input  id="inputs" type="text"  placeholder='enter product name'  value={name} onChange={(e) => setProductName(e.target.value)} /></label>   
     
      <label>Cost  
        <input type="text" placeholder='enter cost'  value={cost} onChange={(e) => setProductCost(e.target.value)} /></label>
     
      <label>Warranty   
      <input type="text" placeholder='enter warranty' value={warranty} onChange={(e) => setProductWarranty(e.target.value)} /></label>
      <label>Description <input type="text"  placeholder='enter description'  value={description} onChange={(e) => setProductDescription(e.target.value)} /></label>
      <label>Rating <input type="number"  placeholder='enter rating'  value={rating} onChange={(e) => setProductRating(e.target.value)} /></label>
      
      <label>Upload image <input
        className="imageupload"
              type="file"
            
              onChange={ (e)=>setFile(e.target.files[0])} /> </label>

      <button type="submit"  onClick={handleUpdate} >Update Product</button>
    </form>
    </div>
  );
};

export default UpdateProduct;



