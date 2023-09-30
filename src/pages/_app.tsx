import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ThemeProvider from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTheme } from "next-themes";
import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import { FiMoon } from "react-icons/fi";

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
			<QueryClientProvider client={_queryClient}>
				<ReactQueryDevtools />
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					<main className="flex justify-center px-3 lg:px-0">
						<section className="w-full max-w-5xl">
							<nav className="sticky top-0 flex justify-between items-center py-7 bg-background z-40">
								<Link href="/">
									<Image
										src={"/logo.png"}
										width={25}
										height={25}
										alt="Gerald Chavez"
									/>
								</Link>
								<div className="flex items-center gap-2">
									<Link href="/blog">
										<Button variant="outline">Blog</Button>
									</Link>
									<Toggle
										pressed={theme === "dark"}
										onPressedChange={(e) => setTheme(e ? "dark" : "light")}
									>
										<FiMoon />
									</Toggle>
								</div>
							</nav>
							<Component {...pageProps} />
							<footer className="py-5 mt-32 flex justify-between">
								<div className="flex gap-1">
									<p>Gerald Chavez</p>
									<p>@{new Date().getFullYear()}</p>
								</div>
							</footer>
						</section>
					</main>
				</ThemeProvider>
			</QueryClientProvider>
		</>
	);
}
