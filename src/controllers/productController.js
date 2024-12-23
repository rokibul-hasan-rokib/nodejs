const Product = require('../models/productModel.js');

export const getAllProduct = async(req, res) =>{
       try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            message: "Product get successfully",
            products
        })
       } catch (error) {
        res.status(404).json({
            success: false,
            message: "Product Not Found",
            error,
        })
       };
}

export const createProduct = async(req,res) => {
  const {name, description, price, categoryId, image} = req.body;

  try {
     const product = new Product(req.body);
     const savedProduct = await product.save();
     res.status(200).json({
        success: true,
        message: "Product Save successfully",
        savedProduct,
     })
  } catch (error) {
    res.status(404).json({
        success: false,
        message: "Product Not Found",
        error,
    })
  }
}