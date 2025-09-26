import express from "express" 
import {getUserProfile, login, register} from "../controller/userController.js"
import {verifyToken} from "../util/validator.js"

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/profile',verifyToken,getUserProfile)

export default router