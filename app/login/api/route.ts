import connectDB from "@/backend/Database/helpers/mongoose";
import {NextRequest, NextResponse} from "next/server";
import User from "../../../backend/Database/Models/User";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";

connectDB().then(() => console.log("Connected to database"));

interface RUser {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    role: string;
}

export async function POST(request: NextRequest) {
    try {
        if (request.headers.get("content-type") !== "application/json") {
            return NextResponse.json({success: false, error: "Invalid content type"}, {status: 400});
        }

        const data = await request.json();
        const {email, password} = data;

        if (!email || !password) {
            return NextResponse.json({success: false, error: "Incomplete data"}, {status: 400});
        }

        const userExists = await User.findOne({email});
        if (!userExists) {
            return NextResponse.json({success: false, error: "User doesn't exist"}, {status: 409});
        }

        const matchPassword: boolean = await bcrypt.compare(password, userExists.password);
        if (!matchPassword) {
            return NextResponse.json({success: false, error: "Invalid Credentials"}, {status: 400});
        }

        const token: string = JWT.sign(
            {email: userExists.email, id: userExists._id},
            process.env.JWT_SECRET as string,
        );

        const user: RUser = {
            _id: userExists._id as mongoose.Types.ObjectId,
            name: userExists.name,
            email: userExists.email,
            role: userExists.role,
        };

        return NextResponse.json({
            success: true,
            message: "User logged in Successfully!",
            token,
            user
        }, {status: 200});

    } catch (error) {
        console.error("Error during user login:", error);
        return NextResponse.json({success: false, error: "Internal Server Error"}, {status: 500});
    }
}
