import mongoose, {Document, Model, Schema} from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"]
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Please provide an email"]
        },
        password: {
            type: String,
            required: [true, "Please provide a password"]
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"]
        },
    },
    {timestamps: true}
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
