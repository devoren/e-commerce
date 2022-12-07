import React from "react";
import Image from "next/image";

const Footer = () => {
	return (
		<div className={"footer-container"}>
			<p>2022 E-commerce. All rights reserverd.</p>
			<a
				href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
				target="_blank"
				rel="noopener noreferrer"
			>
				Powered by{" "}
				<span className={"logo"}>
					<Image
						src="/vercel.svg"
						alt="Vercel Logo"
						width={72}
						height={16}
					/>
				</span>
			</a>
		</div>
	);
};

export default Footer;
