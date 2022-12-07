import Head from "next/head";
import React, { ReactNode } from "react";

import Footer from "components/Footer";
import NavBar from "components/NavBar";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="layout">
			<Head>
				<title>E-commerce</title>
				<meta charSet="utf-8" />
				<meta
					name="description"
					content="E-commerce application will include modern design and animations, the ability to add and edit products on the go using a Sanity, all advanced cart, and checkout functionalities, and most importantly, the complete integration with Stripe so that you can cover real payments."
				/>
				<meta
					name="keywords"
					content="next, javascript, nextjs, reactjs"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<NavBar />
			</header>
			<main className="main-container">{children}</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
};

export default Layout;
