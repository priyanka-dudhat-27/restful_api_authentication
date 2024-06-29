const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

module.exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Errors", errors: errors.array(), success: false });
        }

        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        var img = "";
        if (req.file) {
            img = User.iPath + "/" + req.file.filename;
        }
        req.body.image = img;
        req.body.password = await bcrypt.hash(password, 10);

        const userData = await User.create(req.body);
        if (userData) {
            return res.status(201).json({ message: "User created successfully", data: userData, success: true });
        } else {
            return res.status(400).json({ message: "User creation failed", success: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong on register API", success: false });
    }
};
