import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import styles from "styles/Home.module.css";

import { client, urlFor } from "lib/client";
import { IBanner } from "types";

interface FooterBannerProps {
	footerBanner: IBanner;
}

const FooterBanner = ({
	footerBanner: {
		discount,
		largeText1,
		largeText2,
		saleTime,
		smallText,
		midText,
		desc,
		product,
		buttonText,
		image,
	},
}: FooterBannerProps) => {
	const src = urlFor(image).width(450).height(450).url();
	const imageProps = useNextSanityImage(client, image);

	return (
		<div className={styles["footer-banner-container"]}>
			<div className={styles["banner-desc"]}>
				<div className={styles.left}>
					<p>{discount}</p>
					<h3>{largeText1}</h3>
					<h3>{largeText2}</h3>
					<p>{saleTime}</p>
				</div>
				<div className={styles.right}>
					<p>{smallText}</p>
					<h3>{midText}</h3>
					<p>{desc}</p>
					<Link href={`/product/${product.toLowerCase()}`}>
						<button type="button">{buttonText}</button>
					</Link>
				</div>

				<Image
					{...imageProps}
					src={src}
					className={styles["footer-banner-image"]}
					alt="footer-banner-image"
					width={450}
					height={450}
					priority
				/>
			</div>
		</div>
	);
};

export default FooterBanner;
