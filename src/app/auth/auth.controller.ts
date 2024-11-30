import { Request, Response } from "express";
import authService from "./auth.service";
// import authService from "../services/auth.service";

// Register Handler
export const registerHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const result = await authService.register(email, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Login Handler
export const loginHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Activate Account Handler
export const activateAccountHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.params;

    if (!token) {
      res.status(400).json({ message: "Token is required" });
      return;
    }

    const result = await authService.activateAccount(token);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
