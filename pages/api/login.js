import User from "@/Backend/Models/User";
import connectToDb from "@/Backend/Middleware/mongoose";
import bcrypt from "bcryptjs";
import JWT from 'jsonwebtoken'

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(400).json({ message: `Method ${req.method} is not allowed` });
    }
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all fields" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isPassword = await bcrypt.compare(password, existingUser.password);
        if (!isPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = JWT.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({
            message: "User logged in successfully", token,
            user: { email: existingUser.email, id: existingUser._id }
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}


export default connectToDb(handler);