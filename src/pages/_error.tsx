import Page from "@/components/page-content";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

type RandomQuote = {
	_id: string;
	content: string;
	author: string;
	tags: string[];
	authorSlug: string;
	length: number;
	dateAdded: string;
	dateModified: string;
};

const ErrorPage = () => {
	const randomQuote = useQuery({
		queryKey: ["random-quote"],
		queryFn: async () => {
			const res = await fetch("https://api.quotable.io/random?tags=technology");
			const data = (await res.json()) as RandomQuote;
			return data;
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});

	return (
		<Page
			title="Hmmmm..."
			className="flex flex-col gap-7 justify-center items-center"
		>
			<h4>It's a missing page, but here's a random quote for you</h4>
			<Image src="/404.svg" width={300} height={300} alt="404" />
			{randomQuote.isLoading && (
				<div className="text-center max-w-md flex flex-col gap-3">
					<blockquote className="underline underline-offset-4 italic">
						&#8223;Loading Quote&#8221;
					</blockquote>
					<p>System</p>
				</div>
			)}
			{randomQuote.isSuccess && (
				<div className="text-center max-w-md flex flex-col gap-3">
					<blockquote className="underline underline-offset-4 italic">
						&#8223;{randomQuote.data.content}&#8221;
					</blockquote>
					<p>{randomQuote.data.author}</p>
				</div>
			)}
		</Page>
	);
};

export default ErrorPage;
