const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
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
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
}, {
    timestamps: true,

});

const user = mongoose.models.User || mongoose.model("User", userSchema);

export default user;