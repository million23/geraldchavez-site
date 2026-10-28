import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { Footer } from "#/components/footer";
import { Navbar } from "#/components/navbar";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ title: "Welcome! | Gerald Chavez" },
			{ name: "description", content: "Personal Website" },
			{ property: "og:url", content: "https://geraldchavez.vercel.app/" },
			{ property: "og:type", content: "website" },
			{ property: "og:title", content: "Welcome! | Gerald Chavez" },
			{ property: "og:description", content: "Personal Website" },
			{
				property: "og:image",
				content: "https://geraldchavez.vercel.app/OG.png",
			},
			{ name: "twitter:card", content: "summary_large_image" },
			{
				property: "twitter:domain",
				content: "geraldchavez.vercel.app",
			},
			{
				property: "twitter:url",
				content: "https://geraldchavez.vercel.app/",
			},
			{ name: "twitter:title", content: "Welcome!| Gerald Chavez" },
			{ name: "twitter:description", content: "Personal Website" },
			{
				name: "twitter:image",
				content: "https://geraldchavez.vercel.app/OG.png",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<head>
				<HeadContent />
			</head>
			<body className="bg-background text-foreground">
				<Navbar />
				<div className="mx-auto w-full max-w-[1400px] px-6 pb-16 md:pb-0">
					{children}
					<Footer />
				</div>
				<Scripts />
			</body>
		</html>
	);
}
