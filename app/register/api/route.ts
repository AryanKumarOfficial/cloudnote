import connectDB from "@/backend/Database/helpers/mongoose";
import {NextRequest, NextResponse} from "next/server";
import User from "../../../backend/Database/Models/User";
import bcrypt from "bcryptjs";

connectDB().then(() => console.log("Connected to database"));

export async function POST(request: NextRequest) {
    try {
        if (request.headers.get("content-type") !== "application/json") {
            return NextResponse.json({success: false, error: "Invalid content type"}, {status: 400});
        }

        const data = await request.json();
        const {name, email, password} = data;

        if (!name || !email || !password) {
            return NextResponse.json({success: false, error: "Incomplete data"}, {status: 400});
        }

        const userExists = await User.findOne({email});
        if (userExists) {
            return NextResponse.json({success: false, error: "User already exists"}, {status: 409});
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hash,
        });

        await newUser.save();

        return NextResponse.json({success: true, message: "User Registered Successfully!"}, {status: 201});
    } catch (error) {
        console.error("Error during user registration:", error);
        return NextResponse.json({success: false, error: "Internal Server Error"}, {status: 500});
    }
}
