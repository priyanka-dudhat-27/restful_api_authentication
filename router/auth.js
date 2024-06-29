const express = require('express')
const routes=express.Router()
const authController=require("../controllers/authController")
const User=require("../models/userModel")
const { registerValidator } = require('../helper/validation')

routes.post("/register",User.uploadImage,registerValidator,authController.register)

module.exports=routes;