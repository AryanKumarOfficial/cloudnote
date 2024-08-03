import {connect} from "@/dbConfig/config";
import User from "@/models/User";
import {NextResponse, NextRequest} from "next/server";
import {sendEmail} from "@/helpers/mailer/auth";

connect().then(() => console.log("connected to db")).catch((err) => console.log(err));

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();
        const {email} = reqBody;
        if (!email) {
            return NextResponse.json({
                success: false,
                error: "Incomplete data"
            }, {
                status: 402
            })
        }
        const user = await User.findOne({email})
        console.log(user, "user")
        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User not found!"
            }, {
                status: 404
            })
        }

        await sendEmail({email, emailType: "FORGOT", userId: user._id.toString()})

        return NextResponse.json({
                success: true,
                message: "Reset Link Sent Successfully!"
            }, {status: 200}
        )

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            error: "Internal Server Error"
        }, {
            status: 500
        })
    }
}