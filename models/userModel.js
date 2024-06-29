const mongoose = require('mongoose');
const multer = require("multer");
const path = require('path');
const imgPath = "/public/userimages";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    phone: {
        type: String,
        required: [true, "phone is required"]
    },
    image: {
        type: String,
        default: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    is_verified: {
        type: Number,
        default: 0 // 1 for verified user
    }
}, {
    timestamps: true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", imgPath));
    },
    filename: function (req, file, cb) {
        // const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + Date.now() );
    }
});

const fileFilter = function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error('Please upload an image in jpeg or png format'), false);
    }
};

userSchema.statics.uploadImage = multer({
    storage: storage,
    fileFilter: fileFilter
}).single("image");

userSchema.statics.iPath = imgPath;

const User = mongoose.model("User", userSchema);
module.exports = User;
