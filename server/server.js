import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoutes from "./routes/userRoute.js"
import productRoutes from "./routes/productRoute.js"
import categoryRoutes from "./routes/categoryRoute.js"


dotenv.config()
const app = express()
mongoose.connect(process.env.MONGO_URL)
app.use(express.json())

app.use('/users',userRoutes)
app.use('/products',productRoutes)
app.use('/categories',categoryRoutes)

app.use((err,req,res,next)=>{
  res.status(err.statusCode || 500).json({
    condition : false,
    message : err.message || "Internal Server Error"
  })
})
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})