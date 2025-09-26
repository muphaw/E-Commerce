import {RDB} from "./core.js"

export const getCacheUser = async (userId)=>{
  return await RDB.get(userId)
}

export const setCacheUser = async (userId,user)=>{
  await RDB.set(userId,user)
}