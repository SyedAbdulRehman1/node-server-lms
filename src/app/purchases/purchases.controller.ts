import { Request, Response } from "express";
import { PurchasesService } from "./purchases.service";

const purchasesService = new PurchasesService();

export const checkPurchase = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId: any = req.user;
  const userId1 = userId?.id;
  const courseId = req.query.courseId as string;
  console.log(courseId, "393388");
  console.log(userId1, "userId1");
  if (!userId1) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!courseId) {
    res.status(400).json({ message: "Missing courseId" });
    return;
  }

  try {
    const purchase = await purchasesService.checkUserPurchase(
      courseId,
      userId1
    );

    // if (!purchase) {
    //   res.status(404).json({ message: "Purchase not found" });
    //   return;
    // }

    // Return the purchase details
    // return { purchase: purchase || [] };

    res.json({ purchase: purchase || [] });
  } catch (error) {
    console.error("Error fetching purchase:", error);
    res.status(500).json({ message: "Internal Server Error" }); // Return 500 if something goes wrong
  }
};
