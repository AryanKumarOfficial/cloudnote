import {connect} from "@/dbConfig/config";
import User from "@/models/User"
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helpers/mailer/auth";
import {sendNotification} from "@/helpers/mailer/notification";
import {NotificationType} from "@/helpers/mailer/notification";

connect().then(async () => {
    console.log('Connected to database');
}).catch((err) => {
    console.error(err);
});

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        if (!username || !email || !password) {
            return NextResponse.json({error: 'Please provide all fields', success: false}, {status: 400});
        }


        // check if user already exists
        const userExists = await User.findOne({email});

        if (userExists) {
            return NextResponse.json({error: 'User already exists', success: false}, {status: 400});
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUSer = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUSer.save();

        // send welcome email

        await sendNotification({email, type: NotificationType.WELCOME});


        // send verification email
        await sendEmail({
            email: newUSer.email.toString(),
            userId: newUSer._id.toString(),
            emailType: "VERIFY",
        })
        ;

        return NextResponse.json({message: 'User created successfully', success: true}, {status: 201});
    } catch
        (e: any) {
        console.error(e);
        return NextResponse.json({error: e.message, success: false}, {status: 500});
    }
}
