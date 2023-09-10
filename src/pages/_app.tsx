import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";

import { Theme as RadixTheme, Text } from "@radix-ui/themes";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<RadixTheme appearance="dark" accentColor="crimson" radius="large">
				<main className="flex justify-center px-3 lg:px-0">
					<section className="w-full max-w-5xl">
						<Component {...pageProps} />
						<footer className="py-5 mt-32 flex justify-between">
							<div className="flex gap-1">
								<Text>Gerald Chavez</Text>
								<Text>@{new Date().getFullYear()}</Text>
							</div>
						</footer>
					</section>
				</main>
			</RadixTheme>
		</>
	);
}
