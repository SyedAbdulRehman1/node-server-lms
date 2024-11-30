import { PrismaClient } from "@prisma/client"; // Assuming you're using Prisma

const prisma = new PrismaClient();

export class PurchasesService {
  async checkUserPurchase(courseId: string, userId: string) {
    try {
      // Query the database to find a purchase record for the given userId and courseId
      const purchase = await prisma.purchase.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });
      return purchase; // Return purchase record or null if not found
    } catch (error) {
      console.error("Error checking purchase:", error);
      throw new Error("Error checking purchase");
    }
  }
}
