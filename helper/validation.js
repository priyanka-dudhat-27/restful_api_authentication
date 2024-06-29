const {check} = require("express-validator");

module.exports.registerValidator = [
    check("name","Name is required").not().isEmpty(),
    check("email","please include a valid email").isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check("phone","Mobile no. should be contains 10 digits").isLength({
        min:10,
        max:10
    }),
    check("password","password must be grater than 6 characters and 1 uppercase 1 lowercase 1 special character &number").isStrongPassword({
        minLength:6,
        minUppercase:1,
        minLowercase:1,
        minNumbers:1,
        minSymbols:1
    }),
    check("image").custom((value,{req})=>{
        if(!req.file){
            throw new Error("Image is required")
        }
        if(req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png"){
            return true;
        }else{
            return false;
        }
    }).withMessage("please Upload an image like jpeg , png")

]
