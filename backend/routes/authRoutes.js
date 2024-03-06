const express=require('express');
const authController=require('../controllers/authController');
const loginController=require('../controllers/authController')
//router object
const router=express.Router()

//routes
//register || post
router.post('/register',authController)

//login
router.post('/login',loginController)
//export
module.exports=router;