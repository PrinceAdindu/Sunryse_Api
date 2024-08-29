import {Router, raw} from "express";

import {getClinic, archiveClinic} from "../services/clinic/clinicService";
import config from "../config";

import stripe from "stripe";

const router = Router();

router.post(
  "/stripe",
  raw({type: "application/json"}),
  async (req, res, next) => {
    // Validate Stripe Webhook Authenticity
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        config.stripeWebhookSecret
      );
      console.log(event.type);
      res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      res.status(400).send(`Webhook Error: ${error.message}`);
      return;
    }

    if (event.type === "account.updated") {
      try {
        const stripeId = event.data.object.id;
        const clinic = await getClinic({stripeId: stripeId});
        await verifyStripeUpdate(clinic.id, event.data.payouts_enabled);
      } catch (error) {
        console.log("Error updating clinic with Stripe webhook");
        console.log(error);
      }
    } else if (event.type === "account.application.deauthorized") {
      try {
        const stripeId = event.data.object.id;
        const clinic = await getClinic({stripeId: stripeId});
        await archiveClinic(clinic.id);
      } catch (error) {
        console.log("Error archiving clinic with Stripe webhook");
        console.log(error);
      }
    } else if (event.type !== "capability.updated") {
      console.log("Error unidentified stripe webhook event");
    }
    // else if (event.type === 'checkout.session.completed') {
    //   try {hn m/
    //     const { userId, clinicId, bookingId } =
    //       event.data.object.metaData.bookingId;
    //     const updates = { status: 'booked' };
    //     await upadateBooking(userId, clinicId, bookingId, updates);
    //   } catch (error) {
    //     console.log('Error booking session with Stripe webhook');
    //   }
    // } else if (event.type === 'checkout.session.expired') {
    //   try {
    //     const { userId, clinicId, bookingId } =
    //       event.data.object.metaData.bookingId;
    //     await deleteBooking(userId, clinicId, bookingId);
    //   } catch (error) {
    //     console.log('Error cancelling pending session with Stripe webhook');
    //   }
    // }
  }
);

export default router;
