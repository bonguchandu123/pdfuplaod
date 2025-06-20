// controller/clerkWebhooks.js
import { Webhook } from "svix";
import dotenv from "dotenv";
import User from "../models/User.js";


dotenv.config();

export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook("whsec_xLYCW0wrXt6qwoUt8FwFM8+XKakXd0Po");

    const evt = wh.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
          branch: "unknown",
          year: "1st",
        };
        await User.create(userData);
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        console.log(`Unhandled Clerk webhook type: ${type}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};
