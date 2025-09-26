import {getCacheUser} from "./cache.js"
import {error ,token} from "./core.js"


export const verifyToken = async (req,res,next) => {
  const authHeader = req.headers.authorization
  if(authHeader){
    const authToken = authHeader.split(" ")[1]
    try{
      const decoded = await token.verify(authToken)
      req.userId = decoded.userId
      req.user = await getCacheUser(req.userId)

      if(!req.user){
        return next(error(404,"User not found"))
      }
      next()
    }catch(err){
      console.log(" Token verification failed:", err.name, err.message);
      return next(error(400,"Token expired!"))
    }
    
  }else{
      next(error(401, "Authorization header missing"));
    }
}