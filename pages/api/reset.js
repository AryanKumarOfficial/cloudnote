import user from "@/Backend/Models/User";
import connectTOdb from "@/Backend/Middleware/mongoose";
const bcrypt = require("bcryptjs");

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(400).json({ message: `Method ${req.method} is not allowed`, success: false });
    }
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Please provide email", success: false });
    }
    try {
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User doesn't exists", success: false });
        }
        return res.status(201).json({ message: "User registered successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export default connectTOdb(handler);