"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = void 0;
class LoginDto {
    constructor(email, password) {
        if (!email)
            throw new Error("Email is required");
        if (!password)
            throw new Error("Password is required");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            throw new Error("Email must be a valid email address");
        this.email = email;
        this.password = password;
    }
}
exports.LoginDto = LoginDto;
