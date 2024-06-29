const express = require('express')
const routes=express.Router()

routes.use("/auth",require("./auth"))

module.exports=routes;