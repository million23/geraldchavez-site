import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "@/components/navbar";
import ThemeProvider from "@/components/theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTheme } from "next-themes";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	const { setTheme, theme } = useTheme();

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
				<div className="flex justify-center px-3 lg:px-0">
					<div className="w-full max-w-5xl">
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
