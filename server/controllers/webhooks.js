import { Webhook } from "svix";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
    
    // Verify the incoming webhook with Clerk
    const evt = whook.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const email = data.email_addresses[0].email_address;

        const userData = {
          _id: data.id,
          email,
          name: `${data.first_name} ${data.last_name}`.trim(),
          imageUrl: data.image_url,
          branch: "unknown", // required by model
          year: "1st",        // required by model
          isAdmin: email === "bonguchandu4@gmail.com", // mark yourself as admin
        };

        await User.create(userData);
        res.json({ success: true });
        break;
      }

      case "user.updated": {
        const updateData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`.trim(),
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, updateData);
        res.json({ success: true });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({ success: true });
        break;
      }

      default:
        console.log(`⚠️ Unhandled Clerk webhook type: ${type}`);
        res.status(200).json({ received: true });
    }

  } catch (error) {
    console.error("❌ Clerk Webhook Error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};
