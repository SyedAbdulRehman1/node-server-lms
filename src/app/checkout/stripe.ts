import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

// Initialize Stripe with your secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});
const prisma = new PrismaClient(); // Initialize Prisma client

// Create a checkout session
export const createCheckoutSession = async (user: any, course: any) => {
  // Define line items

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: course.title,
          description: course.description || "Course Description",
        },
        unit_amount: Math.round(course.price * 100),
      },
    },
  ];

  let stripeCustomer = await prisma.stripeCustomer.findUnique({
    where: { userId: user.id },
  });

  if (!stripeCustomer) {
    const customer = await stripe.customers.create({
      email: user.email,
    });

    stripeCustomer = await prisma.stripeCustomer.create({
      data: {
        userId: user.id,
        stripeCustomerId: customer.id,
      },
    });
  }

  // Create a Stripe session
  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomer.stripeCustomerId,
    line_items,
    mode: "payment",
    success_url: `${process.env.APP_URL}/courses/${course.id}?success=1`,
    cancel_url: `${process.env.APP_URL}/courses/${course.id}?canceled=1`,
    metadata: {
      courseId: course.id,
      userId: user.id,
    },
  });

  return session.url;
};
