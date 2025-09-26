import express from "express"
import { createCategory,getAllCategories,deleteCategory } from "../controller/categoryController.js"
import {verifyToken} from "../util/validator.js"
const router = express.Router()

router.post('/',verifyToken,createCategory)
router.get('/',verifyToken,getAllCategories)
// router.get('/:id',verifyToken,getCategoryById)
// router.put('/:id',verifyToken,updateCategory)
router.delete('/:id',verifyToken,deleteCategory)

export default router