import {User} from "../model/userModel.js"
import {setCacheUser} from "../util/cache.js"
import {encoded, error, message, token} from "../util/core.js"

export const register = async (req, res , next) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const phone = req.body.phone
  const address = req.body.address
  const role = req.body.role
  try{
    const user = await User.findOne({email})
    if(user){
      next(error(400,"User already exists"))
    }else{
      const encodedPassword = await encoded.encoded(password)
      await new User({name,email,password : encodedPassword,phone,address,role}).save()
      message(res,"User registered successfully",req.body)
    }
  }catch(err){
    console.log(err)
  }
}

export const login = async (req, res , next) => {
  const email = req.body.email
  const password = req.body.password
  try{
    const user = await User.findOne({email})
    if(!user){
      next(error(401,"User is not registered!"))
      return
    }
    const match = await encoded.compare(password,user.password)
    if(!match){
      next(error(401,"User password is incorrect!"))
      return
    }

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.__v
    
    await setCacheUser(user._id.toString(),userObj)
    const authToken = token.generate(user._id.toString())
    message(res,"User logged in successfully",{authToken})
  }catch(err){
    console.log(err)
  }
}

export const getUserProfile = async (req,res,next)=>{
  try{
    if(!req.user){
      return next(error(404,"User not found"))
    }else{
      message(res,"User profile fetched successfully",req.user)
    }
  }catch(err){
    console.log(err)
  }
  
}