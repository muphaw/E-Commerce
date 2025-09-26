import {Product} from "../model/productModel.js"
import fs from "fs/promises";
import { message,error} from "../util/core.js"
import cloudinary from "../util/cloudinary.js"
import slugify from "slugify";

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const imagePaths = req.files?.map(file => file.path) || [];

    if (imagePaths.length === 0) {
      return next(error(400, "Please upload at least one image."));
    }

    const uploadResults = await Promise.all(
      imagePaths.map(path =>
        cloudinary.uploader.upload(path, { folder: "products" })
      )
    );
    await Promise.all(imagePaths.map(path => fs.unlink(path)));

    const dbProduct = await new Product({
      user: req.user._id,
      name,
      slug,
      description,
      price,
      category,
      stock,
      images: uploadResults.map(r => r.secure_url)
    }).save();

    message(res, "Product created successfully.", dbProduct);
  } catch (err) {
    console.error("Create Product Error:", err);
    next(error(500, "Something went wrong"));
  }
};


export const getAllProducts = async (req,res,next)=>{
  try{
    const products = await Product.find()
    message(res,"All Products!",products)
  }catch(err){
    console.log(err)
  }
}

export const updateProduct = async (req,res,next)=>{
  try{
    const dbProduct = await Product.findById(req.params.id)

    const name = req.body.name
    if(name){
      req.body.slug = slugify(name,{lower : true,strict : true})
    }
    const imagePaths = req.files?.map(file => file.path) || [];
    let newImages = []
    if(imagePaths.length > 0){
      for(const img of dbProduct.images){
        if(img.public_id){
          await cloudinary.uploader.destroy(img.public_id)
        }
      }
    }
     const uploadResults = await Promise.all(
        imagePaths.map(path =>
          cloudinary.uploader.upload(path, { folder: "products" })
        )
      );
      
       await Promise.all(imagePaths.map(path => fs.unlink(path)));
       newImages = uploadResults.map(r => r.secure_url);

      req.body.images = newImages;
      const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    message(res,"Product updated!",updatedProduct)
  }catch(err){
    console.log(err)
  }
}

export const deleteProduct = async (req,res,next)=>{
  try{
    const dbProduct = await Product.findById(req.params.id)
    if(dbProduct){
      const product = await Product.findByIdAndDelete(dbProduct._id)
      message(res,"Delete products!",product)
    }
  }catch(err){
    console.log(err)
  }
}

