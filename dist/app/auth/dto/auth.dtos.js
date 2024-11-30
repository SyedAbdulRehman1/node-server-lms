"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivateAccountDto = exports.LoginDto = exports.RegisterDto = void 0;
class RegisterDto {
    constructor(email, password) {
        if (!email || !email.trim())
            throw new Error("Email is required");
        if (!password || !password.trim())
            throw new Error("Password is required");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            throw new Error("Email must be a valid email address");
        if (password.length < 6)
            throw new Error("Password must be at least 6 characters long");
        this.email = email.trim();
        this.password = password;
    }
}
exports.RegisterDto = RegisterDto;
class LoginDto {
    constructor(email, password) {
        if (!email || !email.trim())
            throw new Error("Email is required");
        if (!password || !password.trim())
            throw new Error("Password is required");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            throw new Error("Email must be a valid email address");
        this.email = email.trim();
        this.password = password;
    }
}
exports.LoginDto = LoginDto;
class ActivateAccountDto {
    constructor(token) {
        if (!token || !token.trim())
            throw new Error("Token is required");
        this.token = token.trim();
    }
}
exports.ActivateAccountDto = ActivateAccountDto;
