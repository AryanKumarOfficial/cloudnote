import User from "@/models/User";
import bcryptjs from "bcryptjs";
import transporter from "@/helpers/mailer/config";

export const sendEmail = async ({email, emailType, userId}: { email: string, emailType: string, userId: string }) => {
    try {
        // create hashed token
        const hashedToken = await bcryptjs.hash(userId, 10);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyExpire: new Date(Date.now() + 3600000) // 1 hour
            }, {
                new: true,
                runValidators: true
            });
        } else if (emailType === "FORGOT") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpire: new Date(Date.now() + 3600000) // 1 hour
            }, {
                new: true,
                runValidators: true
            });
        } else {
            return;
        }
        const mailOptions = {
            from: process.env.NODEMAILER_FROM,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dcdcdc; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #333;">${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</h2>
      <p style="font-size: 16px; color: #555;">
        Hello,
      </p>
      <p style="font-size: 16px; color: #555;">
        You are receiving this email because you requested to ${emailType === "VERIFY" ? "verify your email address" : "reset your password"}. Please click the button below to proceed.
      </p>
      <p style="text-align: center;">
        <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}</a>
      </p>
      <p style="font-size: 14px; color: #777;">
        If you did not request this, please ignore this email.
      </p>
      <p style="font-size: 14px; color: #777;">
        Thank you,<br/>
        The Team
      </p>
    </div>
  `
        };

        return await transporter.sendMail(mailOptions);

    } catch (error: any) {
        throw new Error(error.message);
    }
};