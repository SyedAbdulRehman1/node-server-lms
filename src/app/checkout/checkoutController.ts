import { Request, Response } from "express";
import { CheckoutService } from "./checkoutService";

const checkoutService = new CheckoutService();

export const checkoutCourse = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const user = req.user as any;
    if (!user || !user.id || !user.email) {
      throw new Error("Unauthorized");
    }

    const url = await checkoutService.createCheckoutSession(
      user.id,
      user.email,
      courseId
    );

    res.status(200).json({ url });
  } catch (error: any) {
    console.error("[CHECKOUT_SESSION_ERROR]", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
