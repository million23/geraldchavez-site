import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import NavbarNew from "@/components/navbar-new";
import ThemeProvider from "@/components/theme-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftCircle } from "lucide-react";
import type { AppProps } from "next/app";
import Link from "next/link";

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
				<ScrollArea className="h-screen">
					{/* content */}
					<div className="flex justify-center px-5">
						<div className="w-full pb-16 md:pb-0">
							{/* <Navbar /> */}
							<NavbarNew />
							<QueryClientProvider client={_queryClient}>
								<Component {...pageProps} />
							</QueryClientProvider>
							<footer
								className="py-10 mt-32 flex flex-col gap-5"
								id="footer"
							>
								<p className="text-lg">Had a project idea?</p>
								<h1>Let&apos;s build together</h1>

								<div className="mt-10 mb-7 flex items-center justify-between">
									<Link
										className="text-xl "
										href="mailto:chavezgerald23@gmail.com"
									>
										chavezgerald23@gmail.com
									</Link>
									<ArrowLeftCircle />
								</div>

								<Separator />
								<div className="flex flex-col lg:flex-row lg:items-center gap-3">
									<div className="flex gap-3">
										<Link
											className="hover:underline underline-offset-4"
											href="https://www.linkedin.com/in/geraldchavez23/"
											target="_"
										>
											LinkedIn
										</Link>
										<Link
											className="hover:underline underline-offset-4"
											href="https://www.instagram.com/iam.geraldchavez/"
											target="_"
										>
											Instagram
										</Link>
									</div>
									<p className="flex-1 mt-5 lg:mt-0 lg:text-right">
										© {new Date().getFullYear()} Gerald
										Chavez.
									</p>
								</div>
							</footer>
						</div>
					</div>
				</ScrollArea>
			</ThemeProvider>
		</>
	);
}
