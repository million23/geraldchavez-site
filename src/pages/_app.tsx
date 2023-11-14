import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "@/components/navbar";
import ThemeProvider from "@/components/theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";

const fontProvider = Inter({
	subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
	const _queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	});

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<link rel="icon" href="/favicon.png" />

				<meta name="description" content="Personal Website" />

				<meta property="og:url" content="https://geraldchavez.vercel.app/" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Welcome! | Gerald Chavez" />
				<meta property="og:description" content="Personal Website" />
				<meta
					property="og:image"
					content="https://geraldchavez.vercel.app/OG.png"
				/>

				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="geraldchavez.vercel.app" />
				<meta
					property="twitter:url"
					content="https://geraldchavez.vercel.app/"
				/>
				<meta name="twitter:title" content="Welcome!| Gerald Chavez" />
				<meta name="twitter:description" content="Personal Website" />
				<meta
					name="twitter:image"
					content="https://geraldchavez.vercel.app/OG.png"
				/>
			</Head>

			<div className={fontProvider.className}>
				<ThemeProvider>
					{/* announcement banner */}
					{/* <div
					className={
						"flex gap-1 flex-wrap justify-center items-center py-2 bg-secondary text-secondary-foreground text-sm font-mono"
					}
				>
					Want a quick, sleek, and cheap personal website? Get a quote{" "}
					<Link href="/service" className="text-primary font-mono">
						here
					</Link>
				</div> */}

					{/* content */}
					<div className={"flex justify-center px-3 lg:px-0 font-sans"}>
						<div className="w-full max-w-5xl pb-16 md:pb-0">
							<Navbar />
							<QueryClientProvider client={_queryClient}>
								<ReactQueryDevtools />
								<Component {...pageProps} />
							</QueryClientProvider>
							<footer className="py-5 mt-32 flex justify-between">
								<div className="flex gap-1">
									<p>Gerald Chavez</p>
									<p>@{new Date().getFullYear()}</p>
								</div>
							</footer>
						</div>
					</div>
				</ThemeProvider>
			</div>
		</>
	);
}
