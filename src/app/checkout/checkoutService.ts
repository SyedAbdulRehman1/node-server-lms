import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { stripe } from "./stripe";

export class CheckoutService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async createCheckoutSession(userId: string, email: string, courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
    });
    console.log(courseId, "courseID", course);

    if (!course) {
      throw new Error("Course not found or unpublished");
    }

    const purchase = await this.prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (purchase) {
      throw new Error("Course already purchased");
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
            description: course.description || "No description available",
          },
          unit_amount: Math.round(course.price! * 100),
        },
      },
    ];
    console.log(line_items, "line_iteeem");
    let stripeCustomer = await this.prisma.stripeCustomer.findUnique({
      where: { userId },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email,
      });

      stripeCustomer = await this.prisma.stripeCustomer.create({
        data: {
          userId,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/courses/${course.id}?success=1`,
      cancel_url: `${process.env.FRONTEND_URL}/courses/${course.id}?canceled=1`,
      metadata: {
        courseId: course.id,
        userId,
      },
    });
    console.log(session, "seccc");
    const existingPurchase = await this.prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          courseId,
          userId,
        },
      },
    });

    if (existingPurchase) {
      console.log("Course already purchased");
      throw "Course already purchased";
    }

    try {
      await this.prisma.purchase.create({
        data: {
          courseId,
          userId,
        },
      });
    } catch (err) {
      console.error("Error:", err);
    }
    return session.url;
  }
}
