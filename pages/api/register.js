import user from "@/Backend/Models/User";
import connectTOdb from "@/Backend/Middleware/mongoose";
const bcrypt = require("bcryptjs");

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(400).json({ message: `Method ${req.method} is not allowed` });
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all fields" });
    }
    try {
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                throw err;
            }
            bcrypt.hash(password, salt, async function (err, hash) {
                const newUser = new user({
                    name,
                    email,
                    password: hash,
                });
                await newUser.save();
            });
            if (err) {
                throw err;
            }
        });
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default connectTOdb(handler);