// src/config/config.ts
import dotenv from "dotenv";

dotenv.config();

export const config = {
  JWT_SECRET: process.env.JWT_SECRET || "your_secret_key",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1209600",
  BASE_URL: process.env.BASE_URL || "http://localhost:8003",
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_HOST: process.env.SMTP_HOST,
};
