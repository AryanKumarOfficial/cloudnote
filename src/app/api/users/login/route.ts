import {NextResponse, NextRequest} from "next/server";
import {connect} from "@/dbConfig/config";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";

connect().then(() => console.log("Connected to database")).catch((err) => console.log(err));

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        if (!email || !password) {
            return NextResponse.json({error: "Please provide email and password", success: false}, {status: 400})
        }

        // Check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({error: "Invalid Credentials", success: false}, {status: 404})
        }

        // Check if password is correct
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({error: "Invalid credentials", success: false}, {status: 401})
        }

        // create token data
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // create token
        const token = JWT.sign(payload, process.env.TOKEN_SECRET!, {expiresIn: "1d"});
        const response = NextResponse.json({token, success: true, message: "Login Successful"}, {status: 200});
        response.cookies.set("token", token, {
            httpOnly: true,
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message, success: false}, {status: 500})
    }
}