import slugify from "slugify"
import { Category} from "../model/categoryModel.js"
import {error, message} from "../util/core.js"

export const createCategory = async (req,res,next) => {
  try{
    const name = req.body.name
    const dbCategory = await Category.findOne({name})
    if(dbCategory){
      return next(error(400,"Category is existed!"))
    }else{
      const slug = slugify(name,{lowercase : true,strict : true})
      const newCategory = await new Category({...req.body,slug}).save()
      message(res,"Category created successfully!",newCategory)
    }
  }catch(err){
    console.log(err)
  }
}

export const getAllCategories = async(req,res,next)=>{
  try{
    const categories = await Category.find()
    message(res,"Get all categories!",categories)
  }catch(err){
    console.log(err)
  }
}

export const deleteCategory = async (req,res,next)=>{
  try{
    const dbCategory = await Category.findById(req.params.id)
    if(dbCategory){
      const category = await Category.findByIdAndDelete(dbCategory._id)
      message(res,"Category deleted!",category)
    }
  }catch(err){
    console.log(err)
  }
}