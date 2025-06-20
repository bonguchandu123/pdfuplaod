import { Webhook } from "svix";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body; // raw Buffer
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const evt = wh.verify(payload, headers); // 🔥 Don't JSON.parse here

    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const email = data.email_addresses?.[0]?.email_address || "unknown@email.com";

        const userData = {
          _id: data.id,
          email,
          name: `${data.first_name} ${data.last_name}`.trim(),
          imageUrl: data.image_url,
          branch: "unknown",
          year: "1st",
          isAdmin: email === "bonguchandu4@gmail.com",
        };

        await User.create(userData);
        return res.status(200).json({ success: true });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name} ${data.last_name}`.trim(),
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        return res.status(200).json({ success: true });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({ success: true });
      }

      default:
        console.log("Unhandled event type:", type);
        return res.status(200).json({ received: true });
    }
  } catch (error) {
    console.error("Webhook verification failed:", error.message);
    return res.status(400).json({ success: false, error: error.message });
  }
};
