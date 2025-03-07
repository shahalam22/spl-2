import catchAsync from "../utils/catchAsync.js";
import Stripe from "stripe";
import * as postService from "../services/postService.js";
import * as notificationService from "../services/notificationService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = catchAsync(async (req, res) => {
  const { postId } = req.body;
  const userId = req.user.user_id;

  const post = await postService.getPostById(postId);
  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }

  const metadata = {
    user_id: userId.toString(),
    post_id: postId.toString(),
  };
//   console.log("Creating checkout session with metadata:", metadata);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: post.title,
            description: post.description,
          },
          unit_amount: Math.round(post.price * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}&post_id=${postId}`,
    cancel_url: `http://localhost:3000/resource/${postId}`,
    metadata: metadata,
  });

//   console.log("Checkout session created with ID:", session.id, "Metadata:", session.metadata);

  res.status(200).json({ success: true, id: session.id });
});

export const handleWebhook = catchAsync(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

//   console.log("Webhook received:", JSON.stringify(req.body, null, 2));

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    // console.log("Webhook event type:", event.type);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { user_id, post_id } = session.metadata || {};

    // console.log("Checkout session completed. Metadata:", session.metadata);

    if (!user_id || !post_id) {
      console.error("Missing user_id or post_id in metadata:", session.metadata);
      return res.status(400).json({ success: false, message: "Missing metadata" });
    }

    try {
    //   console.log("Updating post with buyer_id:", { post_id, user_id });
      const updatedPost = await postService.updatePost(post_id, {
        buyer_id: parseInt(user_id, 10),
      });
    //   console.log("Post updated:", updatedPost);

      const postTitle = (await postService.getPostById(post_id)).title;
    //   console.log("Creating notification for user:", user_id);
      const notification = await notificationService.createNotification({
        user_id: parseInt(user_id, 10),
        title: "Purchase Successful",
        content: `You have successfully purchased "${postTitle}"`,
        isRead: false,
      });
    //   console.log("Notification created:", notification);
    } catch (error) {
      console.error("Error processing checkout.session.completed:", error.message);
      throw error;
    }
  }

  res.status(200).json({ received: true });
});
