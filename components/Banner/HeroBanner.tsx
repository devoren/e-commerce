import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import styles from "styles/Home.module.css";
import { urlFor, client } from "lib/client";
import { IBanner } from "types";

interface HeroBannerProps {
	heroBanner: IBanner;
}

const HeroBanner = ({ heroBanner }: HeroBannerProps) => {
	const src = urlFor(heroBanner.image).width(450).height(450).url();
	const imageProps = useNextSanityImage(client, heroBanner.image);

	return (
		<div className={styles["hero-banner-container"]}>
			<div>
				<p className={styles["beats-solo"]}>{heroBanner.smallText}</p>
				<h3>{heroBanner.midText}</h3>
				<h1>{heroBanner.largeText1}</h1>
				<Image
					{...imageProps}
					src={src}
					alt="headphones"
					className={styles["hero-banner-image"]}
					priority
				/>

				<div>
					<Link href={`/product/${heroBanner.product.toLowerCase()}`}>
						<button type="button">{heroBanner.buttonText}</button>
					</Link>
					<div className={styles.desc}>
						<h5>Description</h5>
						<p>{heroBanner.desc}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroBanner;
