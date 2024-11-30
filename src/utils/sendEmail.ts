// src/common/sendEmail.ts
import nodemailer from "nodemailer";
import { config } from "../config/config";

export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Or use SMTP settings
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Sometimes needed to prevent errors in certain environments
    },
  });

  const mailOptions = {
    from: config.SMTP_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
