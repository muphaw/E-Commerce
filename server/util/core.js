import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import redis from "async-redis"

const client = redis.createClient()
export const RDB = {
  set : async (key,value) => {
    await client.set(key,JSON.stringify(value))
  },
  get : async (key) => {
    const data = await client.get(key)
    return data ? JSON.parse(data) : null
  }
}


export const message = (res,msg="",data)=>{
  res.status(200).json({condition : true,message:msg,data:data})
}

export const error = (code,msg)=>{
  const err = new Error(msg)
  err.statusCode = code
  return err
}

export const encoded = {
  encoded : async (password)=> {return await bcrypt.hash(password,10)},
  compare : async (password,hash)=>{return await bcrypt.compare(password,hash)}
} 

export const token = {
  generate : (userId) => JWT.sign({userId},process.env.SECRET_KEY,{expiresIn : "1h"}),
  verify : (token) => {
    return new Promise((resolve,reject)=>{
      JWT.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err) return  reject(err)
        resolve(decoded)
      })
    })
  }
}

