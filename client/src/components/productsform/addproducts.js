import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import './addproducts.css';
import {Link} from 'react-router-dom'


function CreateProducts() {
  const [name, setProductName] = useState('');
  const [cost, setProductCost] = useState('');
  const [warranty, setProductWarranty] = useState('');
  const[description,setProductDescription]=useState('');
  const[rating,setProductRating]=useState('')
  const [errorMessage, setErrorMessage] = useState('');

  const[file,setFile]=useState()
  const[products,setProducts]= useState([])


  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('cost', cost);
      formData.append('warranty', warranty);
      formData.append('description', description);
      formData.append('rating', rating);
      formData.append('image', file);
      
      console.log("formData",formData)

      const response = await axios.post('http://localhost:3001/product/create', formData,{ headers: {"Content-Type":"multipart/form-data"},});

      if (response.status === 201) {
        alert('You Have Successfully Added Product');
        setProductName('');
        setProductCost('');
        setProductWarranty('');
        setProductDescription('');
        setProductRating('');
        setFile(null);
        setErrorMessage('');
      } else {
        console.error('Error creating product:', response.data);
        setErrorMessage('Unexpected error creating product. Please try again.');
      }
    } catch (err) {
      console.error('Error creating product:', err);
      setErrorMessage('Unexpected error creating product. Please try again.');
    }
  };

  
   useEffect(() => {
 
      axios.get('http://localhost:3001/product/') 
      .then(products=> setProducts(products.data))
      .catch(err=> console.log(err))
 
   }, [products]);

  
  

  //delete products
   const handleDelete = async (id) => {
    console.log(id)
    
    const shouldDelete = window.confirm('Are you sure you want to delete this product?');
      if (!shouldDelete) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3001/product/${id}`);
      } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  
  
   return (
    
    <div className='containers'>
      
      <div className='innercontainer'>
      <h2>Create Product</h2>
      <form onSubmit={handleCreateProduct} >
        
        <label  id="labels">Name           <span style={{ color: 'red' }}>*</span>
        <input  id="inputs" type="text"  placeholder='enter product name' required value={name} onChange={(e) => setProductName(e.target.value)} /></label>   
       
        <label>Cost   <span style={{ color: 'red' }}>*</span>
          <input type="text" placeholder='enter cost' required value={cost} onChange={(e) => setProductCost(e.target.value)} /></label>
       
        <label>Warranty   <span style={{ color: 'red' }}>*</span>
          <input type="text" placeholder='enter warranty' required value={warranty} onChange={(e) => setProductWarranty(e.target.value)} /></label>
        
        {/* <label>Description <input type="text"  placeholder='enter description' required value={description} onChange={(e) => setProductDescription(e.target.value)} /></label> */}
        
        <label> Description
          <textarea  id="textarea" name="textarea" rows="4" cols="50" placeholder='enter description' required value={description} onChange={(e) => setProductDescription(e.target.value)}> </textarea>
             </label>
        
        <label>Rating <input type="number"  placeholder='enter rating upto 5'  value={rating} onChange={(e) => setProductRating(e.target.value)} /></label>
       
        
        <label>Upload image <input
        className="imageupload"
              type="file"
              
              onChange={ (e)=>setFile(e.target.files[0])} /> </label>
       
        <button type="submit" >Create Product</button>
       
      </form>
      
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    
       <div className="secondcontainer">
      
       <h2>Product List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Cost</th>
            <th>Warranty</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product,index) => (
            <tr key={product._id}>
              <td>{index + 1}</td> {/* Serial number */}
              <td>{product.name}</td>
              <td>{product.cost}</td>
              <td>{product.warranty}</td>
              <td>{product.description}</td>
              <td>{product.rating}</td>
              <td>
                <button className='delete-button' onClick={() => handleDelete(product._id)}>Delete</button>
                
                  <Link to={"update/"+product._id}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>


    
</div>




  );
}


export default CreateProducts;



  //   const handleCreateProduct = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:3001/product/create', { name, cost, warranty,description,rating});
  //     alert("You Have Succesfully Added Product ")
  //     if (response.status === 201) {
  //       const createdProduct = response.data;
  //       console.log('Product created:', createdProduct);

  //       // Reset form after successful submission
  //       setProductName('');
  //       setProductCost('');
  //       setProductWarranty('');
  //       setErrorMessage('');
  //       setProductDescription('');
  //       setProductRating('');
  //     } else {
  //       console.error('Error creating product:', response.data);
  //       setErrorMessage('Unexpected error creating product. Please try again.');
  //     }
  //   } catch (err) {
  //     console.error('Error creating product:', err);
  //     setErrorMessage('Unexpected error creating product. Please try again.');
  //   }
  // };

  // const handleUpload = async () => {
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     try {
  //       await axios.post('http://localhost:3001/product/create', formData);
  //       console.log('Image uploaded successfully');
  //     } catch (err) {
  //       console.error('Error uploading image:', err);
  //     }
  //   } else {
  //     console.log('No file selected');
  //   }
  // };
