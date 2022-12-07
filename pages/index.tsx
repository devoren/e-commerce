import Head from "next/head";
import Image from "next/image";
import styles from "styles/Home.module.css";
import { FooterBanner, HeroBanner } from "components/Banner";
import { client } from "lib/client";
import { IProduct, IBanner } from "types";
import Product from "components/Product";
import { GetServerSideProps } from "next";

interface HomeProps {
	products: IProduct[];
	bannerData: IBanner[];
}

export default function Home({ products, bannerData }: HomeProps) {
	return (
		<>
			<HeroBanner heroBanner={bannerData[0]} />
			<div className={styles["products-heading"]}>
				<h2>Best Selling Products</h2>
				<p>Speakers of many variations</p>
			</div>
			<div className={styles["products-container"]}>
				{products?.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
			<FooterBanner footerBanner={bannerData && bannerData[1]} />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=2592000, stale-while-revalidate=60"
	);

	const query = '*[_type == "product"]';
	const products: IProduct[] = await client.fetch(query);

	const bannerQuery = '*[_type == "banner"]';
	const bannerData: IBanner[] = await client.fetch(bannerQuery);

	return {
		props: { products, bannerData },
	};
};
