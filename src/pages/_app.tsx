import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { AppProps } from "next/app";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ThemeProvider from "@/components/theme-provider";

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
			<ThemeProvider>
				{/* announcement banner */}
				<div className="flex gap-1 flex-wrap justify-center items-center py-2 bg-secondary text-secondary-foreground">
					I have portfolios now! Check it out{" "}
					<Link href="/portfolio" className="text-primary">
						here
					</Link>{" "}
					or the navigation bar.
				</div>

				{/* content */}
				<div className="flex justify-center px-3 lg:px-0">
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
		</>
	);
}
