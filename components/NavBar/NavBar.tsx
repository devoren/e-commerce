import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { useStateContext } from "context/StateContext";
import Cart from "components/Cart";

const Navbar = () => {
	const { showCart, setShowCart, totalQuantities } = useStateContext();

	return (
		<div className="navbar-container">
			<h3 className="logo">
				<Link href="/">E-commerce</Link>
			</h3>

			<button
				type="button"
				className="cart-icon"
				onClick={() => setShowCart(true)}
			>
				<AiOutlineShopping />
				<span className="cart-item-qty">{totalQuantities}</span>
			</button>

			{showCart && <Cart />}
		</div>
	);
};

export default Navbar;
