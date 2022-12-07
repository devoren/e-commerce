import "styles/globals.css";

import Layout from "components/Layout";
import { StateContext } from "context/StateContext";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";

import type { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
	return (
		<StateContext>
			<Layout>
				<Toaster />
				<NextNProgress
					color="#f02d34"
					height={3}
					showOnShallow={true}
					options={{
						showSpinner: false,
					}}
				/>
				<Component {...pageProps} />
			</Layout>
		</StateContext>
	);
}
