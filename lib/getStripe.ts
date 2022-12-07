import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(
			process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string
		);
	}

	return stripePromise;
};

export default getStripe;
