import { ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { IProduct } from "types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2022-11-15",
	typescript: true,
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			const params: Stripe.Checkout.SessionCreateParams = {
				submit_type: "pay",
				mode: "payment",
				payment_method_types: ["card"],
				billing_address_collection: "auto",
				shipping_options: [
					{ shipping_rate: "shr_1MC3GTEBxxYfHyiEjlunPQWd" },
					{ shipping_rate: "shr_1MC3GzEBxxYfHyiE3Jy6Y4pA" },
				],
				line_items: req.body.map((item: IProduct) => {
					const img = item.image[0].asset._ref;
					const newImage = img
						.replace(
							"image-",
							"https://cdn.sanity.io/images/8x0kjbel/production/"
						)
						.replace("-webp", ".webp");

					return {
						price_data: {
							currency: "usd",
							product_data: {
								name: item.name,
								images: [newImage],
							},
							unit_amount: item.price * 100,
						},
						adjustable_quantity: {
							enabled: true,
							minimum: 1,
						},
						quantity: item.quantity,
					};
				}),
				success_url: `${req.headers.origin}/success`,
				cancel_url: `${req.headers.origin}/canceled`,
			};

			// Create Checkout Sessions from body params.
			const session = await stripe.checkout.sessions.create(params);

			res.status(200).json(session);
		} catch (err) {
			if (err instanceof Error)
				res.status(req.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}
