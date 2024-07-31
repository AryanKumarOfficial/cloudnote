import {connect} from "@/dbConfig/config";
import {NextResponse} from "next/server";
import User from "@/models/User";
import {sendEmail} from "@/helpers/mailer/auth";

connect().then(() => console.log("connected to db")).catch((err) => console.log(err));

export async function POST(req: NextResponse) {
    try {
        const reqBody = await req.json();
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({
            verifyToken: token,
            verifyExpire: {
                $gt: Date.now()
            }
        })

        if (!user) {
            return NextResponse.json({
                message: "Invalid token",
                success: false
            }, {status: 400});
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyExpire = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        }, {status: 200});

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            message: error.message,
            success: false
        }, {status: 500});
    }
}