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
  const {name, description, price, categoryId} = req.body;

  try {
     const product = new Product(req.body,{image: req.file ? req.file.path : ''});
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

export const updateProduct = async(req, res) => {
    const updateData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId,
    };
    if(req.file){
        updateData.image = req.file.path;
    }
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, updateData, {new: true});
        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            updateProduct,
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Product Not Upda ted",
            error,
        })
    }
}

export const getProductById = async(req,res) =>{
      try {
        const products = await Product.findByIdAndUpdate(req.params.id);
        if(!products){
            res.status(404).json({
                success: false,
                message: "Product Not found",
            })
        }
        res.status(200).send({
            success: true,
            message: "Product Get Successfully",
            products,
          });
      } catch (error) {
        res.status(500).send({
            success: true,
            message: "Internal Server Error",
            error,
          });
      }
}

export const deleteProduct = async(req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id);
        res.json({
            message: "Product Deleted Successfully",
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

