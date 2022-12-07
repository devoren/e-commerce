import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import styles from "styles/Home.module.css";

import { IProduct } from "types";
import { client, urlFor } from "lib/client";

interface ProductProps {
	product: IProduct;
}
const Product = ({ product }: ProductProps) => {
	const src = urlFor(product.image[0]).url();
	const imageProps = useNextSanityImage(client, product.image);

	return (
		<div>
			<Link href={`/product/${product.slug.current}`}>
				<div className={styles["product-card"]}>
					<Image
						{...imageProps}
						src={src}
						width={250}
						height={250}
						className={styles["product-image"]}
						alt={"product-image"}
						priority
					/>
					<p className={styles["product-name"]}>{product.name}</p>
					<p className={styles["product-price"]}>${product.price}</p>
				</div>
			</Link>
		</div>
	);
};

export default Product;
