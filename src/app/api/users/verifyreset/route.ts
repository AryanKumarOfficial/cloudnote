import {NextRequest, NextResponse} from "next/server";
import User from "@/models/User";
import {connect} from "@/dbConfig/config";
import bcryptjs from "bcryptjs";
import {NotificationType, sendNotification} from "@/helpers/mailer/notification";

connect().then(() => "DB connected");

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token, password} = reqBody;

        const user = await User.findOne({forgotPasswordToken: token});
        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User not found!"
            }, {status: 404})
        }
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        user.forgotPasswordExpire = undefined;
        user.forgotPasswordToken = undefined;

        await user.save();

        await sendNotification({email: user.email, type: NotificationType.PASSWORD_RESET});

        return NextResponse.json({
                success: true,
                message: "Password Changed Successfully"
            },
            {status: 200}
        )


    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, {status: 500})
    }
}
