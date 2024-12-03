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
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const auth_dtos_1 = require("./dto/auth.dtos");
const config_1 = require("../../config/config");
const sendEmail_1 = require("../../utils/sendEmail");
const prisma = new client_1.PrismaClient();
class AuthService {
    register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerDto = new auth_dtos_1.RegisterDto(email, password);
            const existingUser = yield prisma.user.findUnique({
                where: { email: registerDto.email },
            });
            if (existingUser)
                throw new Error("Email already in use");
            const token = crypto_1.default.randomBytes(32).toString("hex");
            const tokenExpiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            const hashedPassword = yield bcryptjs_1.default.hash(registerDto.password, 10);
            yield prisma.user.create({
                data: {
                    email: registerDto.email,
                    password: hashedPassword,
                    resetToken: token,
                    resetTokenExpiry: tokenExpiration,
                },
            });
            const activationLink = `${config_1.config.BASE_URL}/auth/activate/${token}`;
            yield (0, sendEmail_1.sendEmail)(registerDto.email, "Activate your account", activationLink);
            return {
                message: `Registration successful. Please check your email ${registerDto.email} to activate your account.`,
            };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginDto = new auth_dtos_1.LoginDto(email, password);
            const user = yield prisma.user.findUnique({
                where: { email: loginDto.email },
            });
            if (!user)
                throw new Error("User not found");
            const isPasswordValid = yield bcryptjs_1.default.compare(loginDto.password, user.password);
            if (!isPasswordValid)
                throw new Error("Invalid credentials");
            const payload = {
                id: user.id,
                name: user.name,
                emailVerified: user.emailVerified,
                image: user.image,
                email: user.email,
                userType: user.userType,
                role: user.role,
            };
            const accessToken = jsonwebtoken_1.default.sign(payload, config_1.config.JWT_SECRET, {
                expiresIn: "604800",
            });
            return { accessToken };
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.findUnique({
                    where: { id },
                });
                if (!user) {
                    return null;
                }
                return { hasPassword: !!user.password };
            }
            catch (error) {
                console.error("Error in getUserById service:", error);
                throw new Error("Server error"); // Throw error to be handled by the controller
            }
        });
    }
    activateAccount(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const activateAccountDto = new auth_dtos_1.ActivateAccountDto(token);
            const user = yield prisma.user.findFirst({
                where: {
                    resetToken: activateAccountDto.token,
                    resetTokenExpiry: {
                        not: null,
                    },
                },
            });
            if (!user || !user.resetTokenExpiry)
                throw new Error("Invalid or expired token");
            if (new Date() > user.resetTokenExpiry)
                throw new Error("Token expired, please request a new one");
            yield prisma.user.update({
                where: { id: user.id },
                data: {
                    emailVerified: true,
                    resetToken: null,
                    resetTokenExpiry: null,
                },
            });
            return { message: "Account activated successfully" };
        });
    }
    updateUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, oldPassword, newPassword, name, email, image, }) {
            // Fetch user from DB
            const user = yield prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new Error("User not found");
            }
            const dataToUpdate = {};
            if (newPassword) {
                if (!oldPassword) {
                    throw new Error("Old password is required");
                }
                if (user.password) {
                    const isOldPasswordValid = yield bcryptjs_1.default.compare(oldPassword, user.password);
                    if (!isOldPasswordValid) {
                        throw new Error("Old password is incorrect");
                    }
                }
                const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
                dataToUpdate.password = hashedPassword;
            }
            if (name)
                dataToUpdate.name = name;
            if (email)
                dataToUpdate.email = email;
            if (image)
                dataToUpdate.image = image;
            return yield prisma.user.update({
                where: { id },
                data: dataToUpdate,
            });
        });
    }
}
exports.AuthService = AuthService;
exports.default = new AuthService();
