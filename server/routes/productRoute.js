import express from "express"
import {verifyToken} from "../util/validator.js"
import { createProduct, getAllProducts,deleteProduct,updateProduct } from "../controller/productController.js"
import {upload} from "../middleware/multer.js"
const router = express.Router()

router.post('/',verifyToken,upload.array("images",5),createProduct)
router.get('/',verifyToken,getAllProducts)
// router.get('/:id',verifyToken,getProductById)
router.put('/:id',verifyToken,upload.array("images",5),updateProduct)
router.delete('/:id',verifyToken,deleteProduct)

export default router