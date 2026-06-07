import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.NODE_EMAIL,
        pass: process.env.NODE_PASS,
    },
});

// console.log("EMAIL:", process.env.NODE_EMAIL);
// console.log("PASS:", process.env.NODE_PASS);

export const sendOtpMail=async(to,otp)=>{
    await transporter.sendMail({
        from:process.env.NODE_EMAIL,
        to,
        subject:"Reset Yout Password",
        html: `<p>Your otp for password reset is ${otp}</p>`
    })
}