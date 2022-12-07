import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { IProduct } from "types";

interface ContextProps {
	showCart: boolean;
	setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
	cartItems: IProduct[];
	totalPrice: number;
	totalQuantities: number;
	qty: number;
	incQty: () => void;
	decQty: () => void;
	onAdd: (product: IProduct, quantity: number) => void;
	toggleCartItemQuanitity: (id: string, value: "inc" | "dec") => void;
	onRemove: (product: IProduct) => void;
	setCartItems: React.Dispatch<React.SetStateAction<IProduct[]>>;
	setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
	setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
}

const Context = createContext<ContextProps>({
	cartItems: [],
	showCart: false,
	setShowCart: function (value: React.SetStateAction<boolean>): void {},
	totalPrice: 0,
	totalQuantities: 0,
	qty: 0,
	incQty: function (): void {},
	decQty: function (): void {},
	onAdd: function (product: IProduct, quantity: number): void {},
	toggleCartItemQuanitity: function (
		id: string,
		value: "inc" | "dec"
	): void {},
	onRemove: function (product: IProduct): void {},
	setCartItems: function (value: React.SetStateAction<IProduct[]>): void {},
	setTotalPrice: function (value: React.SetStateAction<number>): void {},
	setTotalQuantities: function (value: React.SetStateAction<number>): void {},
});

interface StateContextProps {
	children: React.ReactNode;
}

export const StateContext = ({ children }: StateContextProps) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState<IProduct[]>([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	let foundProduct: IProduct;
	let index: number;

	const onAdd = (product: IProduct, quantity: number) => {
		const checkProductInCart = cartItems.find(
			(item) => item._id === product._id
		);

		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities(
			(prevTotalQuantities) => prevTotalQuantities + quantity
		);

		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct?.quantity! + quantity,
					};
			});
			if (updatedCartItems.length > 0) {
				setCartItems(updatedCartItems as IProduct[]);
			}
		} else {
			product.quantity = quantity;

			setCartItems([...cartItems, { ...product }]);
		}

		toast.success(`${qty} ${product.name} added to the cart.`);
	};

	const onRemove = (product: IProduct) => {
		foundProduct = cartItems.find(
			(item) => item._id === product._id
		) as IProduct;
		const newCartItems = cartItems.filter(
			(item) => item._id !== product._id
		);

		setTotalPrice(
			(prevTotalPrice) =>
				prevTotalPrice - foundProduct.price * foundProduct?.quantity!
		);
		setTotalQuantities(
			(prevTotalQuantities) =>
				prevTotalQuantities - foundProduct?.quantity!
		);
		setCartItems(newCartItems);
	};

	const toggleCartItemQuanitity = (id: string, value: "inc" | "dec") => {
		foundProduct = cartItems.find((item) => item._id === id) as IProduct;
		index = cartItems.findIndex((product) => product._id === id);
		const newCartItems = cartItems.filter((item) => item._id !== id);

		if (value === "inc") {
			setCartItems([
				...newCartItems,
				{
					...foundProduct,
					quantity:
						foundProduct.quantity && foundProduct.quantity + 1,
				},
			]);
			setTotalPrice(
				(prevTotalPrice) => prevTotalPrice + foundProduct.price
			);
			setTotalQuantities(
				(prevTotalQuantities) => prevTotalQuantities + 1
			);
		} else if (value === "dec") {
			if (foundProduct.quantity && foundProduct.quantity > 1) {
				setCartItems([
					...newCartItems,
					{ ...foundProduct, quantity: foundProduct.quantity - 1 },
				]);
				setTotalPrice(
					(prevTotalPrice) => prevTotalPrice - foundProduct.price
				);
				setTotalQuantities(
					(prevTotalQuantities) => prevTotalQuantities - 1
				);
			}
		}
	};

	const incQty = () => {
		setQty((prevQty) => prevQty + 1);
	};

	const decQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 < 1) return 1;

			return prevQty - 1;
		});
	};

	return (
		<Context.Provider
			value={{
				showCart,
				setShowCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				incQty,
				decQty,
				onAdd,
				toggleCartItemQuanitity,
				onRemove,
				setCartItems,
				setTotalPrice,
				setTotalQuantities,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
