import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { ActivateAccountDto, LoginDto, RegisterDto } from "./dto/auth.dtos";
import { config } from "../../config/config";
import { sendEmail } from "../../utils/sendEmail";
// import sendEmail from '../utils/sendEmail';
// import config from '../config/config';
// import { RegisterDto, LoginDto, ActivateAccountDto } from '../dtos/auth.dtos';
interface UpdateUserParams {
  id: string;
  oldPassword?: string;
  newPassword?: string;
  name?: string;
  email?: string;
  image?: string;
}
const prisma = new PrismaClient();

export class AuthService {
  async register(
    email: string,
    password: string
  ): Promise<{ message: string }> {
    const registerDto = new RegisterDto(email, password);

    const existingUser = await prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) throw new Error("Email already in use");

    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    await prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        resetToken: token,
        resetTokenExpiry: tokenExpiration,
      },
    });

    const activationLink = `${config.BASE_URL}/auth/activate/${token}`;
    await sendEmail(registerDto.email, "Activate your account", activationLink);

    return {
      message: `Registration successful. Please check your email ${registerDto.email} to activate your account.`,
    };
  }

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string }> {
    const loginDto = new LoginDto(email, password);

    const user = await prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password!
    );
    if (!isPasswordValid) throw new Error("Invalid credentials");
    const payload = {
      id: user.id,
      name: user.name,
      emailVerified: user.emailVerified,
      email: user.email,
      userType: user.userType,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "604800",
    });

    return { accessToken };
  }
  async getUserById(id: any) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return null;
      }

      return { hasPassword: !!user.password, ...user };
    } catch (error) {
      console.error("Error in getUserById service:", error);
      throw new Error("Server error"); // Throw error to be handled by the controller
    }
  }

  async activateAccount(token: string): Promise<{ message: string }> {
    const activateAccountDto = new ActivateAccountDto(token);

    const user = await prisma.user.findFirst({
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

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { message: "Account activated successfully" };
  }

  async updateUser({
    id,
    oldPassword,
    newPassword,
    name,
    email,
    image,
  }: UpdateUserParams) {
    // Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const dataToUpdate: any = {};

    if (newPassword) {
      if (!oldPassword) {
        throw new Error("Old password is required");
      }

      if (user.password) {
        const isOldPasswordValid = await bcrypt.compare(
          oldPassword,
          user.password
        );
        if (!isOldPasswordValid) {
          throw new Error("Old password is incorrect");
        }
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      dataToUpdate.password = hashedPassword;
    }

    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (image) dataToUpdate.image = image;

    return await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });
  }
}

export default new AuthService();
