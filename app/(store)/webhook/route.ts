// import stripe from "@/lib/stripe";
// import { backendClient } from "@/sanity/lib/backendClient";
// import { headers } from "next/headers";
// import { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// export async function POST(request: NextRequest) {
//   const body = await request.text();
//   const headersList = await headers();
//   const sig = request.headersList.get("Stripe-Signature") || "";

//   if (sig === "") {
//     return NextResponse.json({ error: "No signature" }, { status: 400 });
//   }

//   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

//   if (!webhookSecret) {
//     console.log("No Webhook Secret");
//     return NextResponse.json({ error: "No webhook secret" }, { status: 400 });
//   }
//   let event: Stripe.Event;
//   try {
//     event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
//   } catch (err) {
//     console.error("Webhook signature verification failed.", err);
//     return NextResponse.json(
//       { error: "Webhook signature verification failed" },
//       { status: 400 }
//     );
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object as Stripe.Checkout.Session;

//     try {
//       const order = await createOrderInSanity(session);
//       console.log("Order Created Successfully", order);
//     } catch (error) {
//       console.error("Error Creating Order In Sanity", error);
//       return NextResponse.json(
//         { error: "Error Creating Order" },
//         { status: 500 }
//       );
//     }
//     return NextResponse.json({ recieved: true }, { status: 200 });
//   }
// }

// async function createOrderInSanity(session: Stripe.Checkout.Session) {
//   const {
//     id,
//     amount_total,
//     metadata,
//     currency,
//     payment_intent,
//     customer,
//     total_details,
//   } = session;

//   const { orderNumber, customerName, customerEmail, clerkUserId } =
//     metadata as {
//       orderNumber: string;
//       customerName: string;
//       customerEmail: string;
//       clerkUserId: string;
//     };

//   // Fetch line items with expanded product info
//   const lineItemsWithProducts = await stripe.checkout.sessions.listLineItems(
//     id,
//     {
//       expand: ["data.price.product"],
//     }
//   );

//   // Format for Sanity schema
//   const sanityProducts = lineItemsWithProducts.data.map((item) => ({
//     _key: crypto.randomUUID(),
//     product: {
//       _type: "reference",
//       _ref: (item.price?.product as Stripe.Product).id,
//     },
//     quantity: item.quantity || 0,
//   }));

//   // Create the order in Sanity
//   const order = await backendClient.create({
//     _type: "order",
//     orderNumber,
//     stripeCheckoutSessionId: id,
//     stripePaymentIntentId: payment_intent,
//     customerName,
//     stripeCustomerId: customer,
//     clerkUserId,
//     email: customerEmail,
//     currency,
//     amountDiscount: total_details?.amount_discount
//       ? total_details.amount_discount / 100
//       : 0,
//     products: sanityProducts,
//     totalPrice: amount_total ? amount_total / 100 : 0,
//     status: "paid",
//     orderDate: new Date().toISOString(),
//   });

//   return order;
// }

import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get("Stripe-Signature") || "";

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.log("No Webhook Secret");
    return NextResponse.json({ error: "No webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const order = await createOrderInSanity(session);
      console.log("Order Created Successfully", order);
    } catch (error) {
      console.error("Error Creating Order In Sanity", error);
      return NextResponse.json(
        { error: "Error Creating Order" },
        { status: 500 }
      );
    }
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // Handle other event types (optional)
  return NextResponse.json({ error: "Unhandled event type" }, { status: 400 });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const {
    id,
    amount_total,
    metadata,
    currency,
    payment_intent,
    customer,
    total_details,
  } = session;

  const { orderNumber, customerName, customerEmail, clerkUserId } =
    metadata as {
      orderNumber: string;
      customerName: string;
      customerEmail: string;
      clerkUserId: string;
    };

  // Fetch line items with expanded product info
  const lineItemsWithProducts = await stripe.checkout.sessions.listLineItems(
    id,
    {
      expand: ["data.price.product"],
    }
  );

  // Format for Sanity schema
  const sanityProducts = lineItemsWithProducts.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product).id,
    },
    quantity: item.quantity || 0,
  }));

  // Create the order in Sanity
  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customer,
    clerkUserId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  return order;
}
