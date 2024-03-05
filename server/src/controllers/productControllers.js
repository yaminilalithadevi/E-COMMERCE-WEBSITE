const productModel = require("../models/productModel");
const multer=require('multer')
const path = require('path');
const fs = require('fs/promises');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination folder for uploaded images
   // cb(null, 'src/public/Images');
    cb(null, '../client/public/images');
    
  },
  filename:function (req, file, cb) {
    // Define the filename for the uploaded image
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});

// Multer configuration using the storage options
const upload = multer({ storage: storage });

// Route handler for creating a product
const createProduct = async (req, res) => {
  try {
    const { name, cost, warranty, description, rating } = req.body;
    const { filename } = req.file;

    const newProduct = new productModel({
      name,
      cost,
      warranty,
      description,
      rating,
      image: filename,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Internal Server Error');
  }
};


// const updateProduct =  async (req, res) => {
  
//     try {
//       const productId = req.params.id;
//       const { name, cost, warranty, description, rating } = req.body;
//       const image = req.file;
    
//       console.log(productId,image)
//       const existingProduct = await productModel.findById(productId);
  
//       console.log("existing product details",existingProduct)
//       if (!existingProduct) {
//         return res.status(404).json({ message: 'Product not found' });
//       }
      
//       if (!existingProduct.image) {
//         existingProduct.image = image.filename;
//       } 
//         // Delete the old image if it exists
//           if (existingProduct.image) {
//              const imagePath = path.join('../client/public/images', existingProduct.image);
//                await fs.unlink(imagePath);
//               }
//         // Save the new image
//               if (image) {
//               existingProduct.image = image.filename;
//              } 
     
//           // Update other fields
//            existingProduct.name = name;
//             existingProduct.cost = cost;
//             existingProduct.warranty = warranty;
//            existingProduct.description = description;
//            existingProduct.rating = rating;
  
//       // Save the updated product
//       await existingProduct.save();
  
//       res.status(200).json(existingProduct);
//     } catch (error) {
//       console.error('Error updating product:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   };

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, cost, warranty, description, rating } = req.body;
    const image = req.file;

    const existingProduct = await productModel.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product
    existingProduct.name = name;
    existingProduct.cost = cost;
    existingProduct.warranty = warranty;
    existingProduct.description = description;
    existingProduct.rating = rating;

    // If there's a new image, update the image data in the database
    if (image) {
      existingProduct.image = image.filename; // Assuming Multer stores  the image
    }

    await existingProduct.save();

    res.status(200).json(existingProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Internal Server Error');
  }
};






const getProduct=async (req,res)=>{
  
    const user = await productModel.findOne({_id:req.params.id});
    console.log(req.params.id)
    if(user){
      res.json(user)
    } else{
      res.send({"result":"No Record found"})
    }
    
  }





  //print all the products which we add 
  const getAllProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteProduct = async (req,res) =>{

  let result= await productModel.deleteOne({_id:req.params.id})
   res.send(result)
}


module.exports = { createProduct, getProduct, deleteProduct, updateProduct,getAllProduct,upload};



// const createProduct = async (req, res) => {
//   try {
//     const data = new productModel({
//       name: req.body.name,
//       cost: req.body.cost,
//       warranty: req.body.warranty,
//       description: req.body.description,
//        rating : req.body.rating,
       
//     });
//     const createdProduct = await data.save();
//     res.status(201).json(createdProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// }


// const updateProduct = async (req, res) => {

//   try {
//     const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.json(updatedProduct);
//   } catch (error) {
//     console.error('Error updating product:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }