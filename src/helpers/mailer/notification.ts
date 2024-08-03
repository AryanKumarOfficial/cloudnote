import transporter from "@/helpers/mailer/config";

export enum NotificationType {
    WELCOME = "WELCOME",
    VERIFICATION = "VERIFICATION",
    PASSWORD_RESET = "PASSWORD_RESET",
}

interface Notification {
    email: string;
    type: NotificationType;
}

export const sendNotification = async ({email, type}: Notification) => {
    try {
        let mailOptions;
        if (type === NotificationType.WELCOME) {
            mailOptions = {
                from: process.env.NODEMAILER_FROM,
                to: email,
                subject: "Welcome to our platform",
                html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dcdcdc; border-radius: 10px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Welcome to our platform</h2>
            <p style="font-size: 16px; color: #555;">
                Hello,
            </p>
            <p style="font-size: 16px; color: #555;">
                You are receiving this email because you have successfully signed up to our platform. Please click the button below to proceed.
            </p>
            <p style="text-align: center;">
                <a href="${process.env.DOMAIN}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Go to platform</a>
            </p>
            <p style="font-size: 14px; color: #777;">
                If you did not sign up, please ignore this email.
            </p>
            <p style="font-size: 14px; color: #777;">
                Thank you,<br/>
                The Team
            </p>
        </div>
        `
            }
        } else if (type === NotificationType.VERIFICATION) {
            // WHEN THE USER HAS BEEN VERIFIED SUCCESSFULLY
            mailOptions = {
                from: process.env.NODEMAILER_FROM,
                to: email,
                subject: "Verification successful",
                html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dcdcdc; border-radius: 10px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Verification successful</h2>
            <p style="font-size: 16px; color: #555;">
                Hello,
            </p>
            <p style="font-size: 16px; color: #555;">
                You are receiving this email because your account has been successfully verified. Please click the button below to proceed.
            </p>
            <p style="text-align: center;">
                <a href="${process.env.DOMAIN}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Go to platform</a>
            </p>
            <p style="font-size: 14px; color: #777;">
                If you did not verify your account, please ignore this email.
            </p>
            <p style="font-size: 14px; color: #777;">
                Thank you,<br/>
                The Team
            </p>
        </div>
        `
            }

        } else if (
            type === NotificationType.PASSWORD_RESET
        ) {
            // WHEN THE USER PASSWORD HAS BEEN RESET SUCCESSFULLY
            mailOptions = {
                from: process.env.NODEMAILER_FROM,
                to: email,
                subject: "Password reset successful",
                html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dcdcdc; border-radius: 10px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Password reset successful</h2>
            <p style="font-size: 16px; color: #555;">
                Hello,
            </p>
            <p style="font-size: 16px; color: #555;">
                You are receiving this email because your password has been successfully reset. Please click the button below to proceed.
            </p>
            <p style="text-align: center;">
                <a href="${process.env.DOMAIN}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Go to platform</a>
            </p>
            <p style="font-size: 14px; color: #777;">
                If you did not reset your password, please ignore this email.
            </p>
            <p style="font-size: 14px; color: #777;">
                Thank you,<br/>
                The Team
            </p>
        </div>
        `
            }
        } else {
            return;
        }

        return await transporter.sendMail(mailOptions);

    } catch (error: any) {
        throw new Error(error.message);
    }
}