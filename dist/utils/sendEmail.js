"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
// src/common/sendEmail.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config/config");
const sendEmail = (to, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail", // Or use SMTP settings
        auth: {
            user: config_1.config.SMTP_USER,
            pass: config_1.config.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false, // Sometimes needed to prevent errors in certain environments
        },
    });
    const mailOptions = {
        from: config_1.config.SMTP_USER,
        to,
        subject,
        text,
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
});
exports.sendEmail = sendEmail;