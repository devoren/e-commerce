import { GetStaticProps } from "next";
import Image from "next/image";
import React, { useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { client, urlFor } from "lib/client";
import {
	AiFillStar,
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineStar,
} from "react-icons/ai";
import Product from "components/Product";
import { IProduct } from "types";
import { useStateContext } from "context/StateContext";
import styles from "styles/Product.module.css";

interface ProductDetailsProps {
	product: IProduct;
	products: IProduct[];
}

const ProductDetails = ({ product, products }: ProductDetailsProps) => {
	const { image, name, details, price } = product;
	const [index, setIndex] = useState(0);
	const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

	const src = (item: any, size: number) => {
		return urlFor(item).width(size).height(size).url();
	};

	const handleBuyNow = () => {
		onAdd(product, qty);
		setShowCart(true);
	};

	return (
		<div>
			<div className={styles["product-detail-container"]}>
				<div>
					<div className="image-container">
						<Image
							src={src(image && image[index], 400)}
							width={400}
							height={400}
							className={styles["product-detail-image"]}
							alt="product-detail-image"
						/>
					</div>
					<div className={styles["small-images-container"]}>
						{image?.map((item, i) => (
							<Image
								key={i}
								src={src(item, 70)}
								width={70}
								height={70}
								className={
									i === index
										? [
												styles["small-image"],
												styles["selected-image"],
										  ].join(" ")
										: styles["small-image"]
								}
								onMouseEnter={() => setIndex(i)}
								alt="product-detail-image"
							/>
						))}
					</div>
				</div>

				<div className={styles["product-detail-desc"]}>
					<h1>{name}</h1>
					<div className={styles.reviews}>
						<div>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</div>
						<p>(20)</p>
					</div>
					<h4>Details: </h4>
					<p>{details}</p>
					<p className={styles.price}>${price}</p>
					<div className={styles.quantity}>
						<h3>Quantity:</h3>
						<p className={"quantity-desc"}>
							<span className={"minus"} onClick={decQty}>
								<AiOutlineMinus />
							</span>
							<span className={"num"}>{qty}</span>
							<span className={"plus"} onClick={incQty}>
								<AiOutlinePlus />
							</span>
						</p>
					</div>
					<div className={styles.buttons}>
						<button
							type="button"
							className={styles["add-to-cart"]}
							onClick={() => onAdd(product, qty)}
						>
							Add to Cart
						</button>
						<button
							type="button"
							className={styles["buy-now"]}
							onClick={handleBuyNow}
						>
							Buy Now
						</button>
					</div>
				</div>
			</div>

			<div className={styles["maylike-products-wrapper"]}>
				<h2>You may also like</h2>
				<div className={styles.marquee}>
					<div
						className={[
							styles["maylike-products-container"],
							styles.track,
						].join(" ")}
					>
						{products.map((item) => (
							<Product key={item._id} product={item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

interface IParams extends ParsedUrlQuery {
	slug: string;
}

export const getStaticPaths = async () => {
	const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;

	const products: IProduct[] = await client.fetch(query);

	const paths = products.map((product) => ({
		params: {
			slug: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params as IParams;

	const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const product: IProduct = await client.fetch(query);
	const productsQuery = '*[_type == "product"]';
	const products: IProduct[] = await client.fetch(productsQuery);

	return {
		props: { product, products },
	};
};

export default ProductDetails;
