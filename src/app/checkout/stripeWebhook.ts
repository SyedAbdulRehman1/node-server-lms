import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { stripe } from "./stripe"; // Your Stripe instance
import Stripe from "stripe";

const prisma = new PrismaClient();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
// let event: Stripe.Event;

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  let event: Stripe.Event;
  // const session = event.data.object as Stripe.Checkout.Session;

  try {
    // event =
    event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret!);
    console.log(event, "ekdkd");
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata!.userId;
        const courseId = session.metadata!.courseId;

        // Check if the course was already purchased
        const existingPurchase = await prisma.purchase.findUnique({
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

        // Create a new purchase record after successful payment
        await prisma.purchase.create({
          data: {
            courseId,
            userId,
          },
        });

        console.log("Purchase recorded successfully");
        break;

      // Handle other events (if needed)
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send("Webhook received");
  } catch (err) {
    console.error("Error:", err);
    res.status(400).send("Webhook error");
  }
};
