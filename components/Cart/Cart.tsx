import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineLeft,
	AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "context/StateContext";
import { urlFor } from "lib/client";
import getStripe from "lib/getStripe";
import styles from "styles/Cart.module.css";

const Cart = () => {
	const cartRef = useRef<HTMLDivElement | null>(null);
	const {
		showCart,
		totalPrice,
		totalQuantities,
		cartItems,
		setShowCart,
		toggleCartItemQuanitity,
		onRemove,
	} = useStateContext();

	const handleCheckout = async () => {
		const stripe = await getStripe();

		const response = await fetch("/api/stripe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cartItems),
		});

		if (response.status === 500) return;

		const data = await response.json();

		toast.loading("Redirecting...");

		stripe?.redirectToCheckout({ sessionId: data.id });
	};

	return (
		<div className={styles["cart-wrapper"]} ref={cartRef}>
			<div className={styles["cart-container"]}>
				<button
					type="button"
					className={styles["cart-heading"]}
					onClick={() => setShowCart(false)}
				>
					<AiOutlineLeft />
					<span className={styles.heading}>Your Cart</span>
					<span className={styles["cart-num-items"]}>
						({totalQuantities} items)
					</span>
				</button>

				{cartItems.length < 1 && (
					<div className={styles["empty-cart"]}>
						<AiOutlineShopping size={150} />
						<h3>Your shopping bag is empty</h3>
						<Link href="/">
							<button
								type="button"
								onClick={() => setShowCart(false)}
								className={styles.btn}
							>
								Continue Shopping
							</button>
						</Link>
					</div>
				)}

				<div className={styles["product-container"]}>
					{cartItems.length >= 1 &&
						cartItems.map((item) => (
							<div className={styles.product} key={item._id}>
								<Image
									src={urlFor(item?.image[0])
										.width(150)
										.height(150)
										.url()}
									className={styles["cart-product-image"]}
									alt="cart-product-image"
									width={150}
									height={150}
									priority
								/>
								<div className={styles["item-desc"]}>
									<div
										className={[
											styles.flex,
											styles.top,
										].join(" ")}
									>
										<h5>{item.name}</h5>
										<h4>${item.price}</h4>
									</div>
									<div
										className={[
											styles.flex,
											styles.bottom,
										].join(" ")}
									>
										<div>
											<p className="quantity-desc">
												<span
													className="minus"
													onClick={() =>
														toggleCartItemQuanitity(
															item._id,
															"dec"
														)
													}
												>
													<AiOutlineMinus />
												</span>
												<span className="num">
													{item.quantity}
												</span>
												<span
													className="plus"
													onClick={() =>
														toggleCartItemQuanitity(
															item._id,
															"inc"
														)
													}
												>
													<AiOutlinePlus />
												</span>
											</p>
										</div>
										<button
											type="button"
											className={styles["remove-item"]}
											onClick={() => onRemove(item)}
										>
											<TiDeleteOutline />
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
				{cartItems.length >= 1 && (
					<div className={styles["cart-bottom"]}>
						<div className={styles.total}>
							<h3>Subtotal:</h3>
							<h3>${totalPrice}</h3>
						</div>
						<div className={styles["btn-container"]}>
							<button
								type="button"
								className={styles.btn}
								onClick={handleCheckout}
							>
								Pay with Stripe
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
