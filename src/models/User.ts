import mongoose, {Document} from "mongoose";

interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    isVerified: boolean;
    isAdmin: boolean;
    forgotPasswordToken?: string;
    forgotPasswordExpire?: Date;
    verifyToken?: string;
    verifyExpire?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
            username: {
                type: String,
                required: [true, "Please provide a username"],
                unique: true,
            },
            email: {
                type: String,
                required: [true, "Please provide an email"],
                unique: true,
            },
            password: {
                type: String,
                required: [true, "Please provide a password"],
            },
            isVerified: {
                type: Boolean,
                default: false
            },
            isAdmin: {
                type: Boolean,
                default: false
            },
            forgotPasswordToken: String,
            forgotPasswordExpire: Date,
            verifyToken: String,
            verifyExpire: Date
        },
        {
            timestamps: true
        }
    )
;

const User =mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default User;