import Page from "@/components/page-content";
import TopGradientGlow from "@/components/top-gradient-glow";
import { Button } from "@/components/ui/button";
import $$sanity from "@/lib/sanity.client";
import { Portfolio } from "@/lib/types";
import dayjs from "dayjs";
import { CopyIcon } from "lucide-react";
import { GetStaticProps } from "next";
import { PortableText, groq } from "next-sanity";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "sonner";

type PageProps = {
	portfolio: Portfolio;
};

export const getStaticPaths = async () => {
	const q = groq`
		*[_type == "portfolio"] {
			_id,
			body,
			title,
			publishedAt,
			"slug": slug.current,
			mainImage { alt, "url": asset -> url },
		}
	`;

	const portfolio = (await $$sanity.fetch(q)) as Portfolio[];

	const paths = portfolio.map((post) => ({
		params: { slug: post.slug },
	}));

	return { paths, fallback: false };
};

export const getStaticProps = (async (context) => {
	const { slug } = context.params as { slug: string };

	const q = groq`
		*[_type == "portfolio" && slug.current == "${slug}"][0]
	`;

	const portfolio = (await $$sanity.fetch(q)) as Portfolio;

	return {
		props: { portfolio },
	};
}) satisfies GetStaticProps;

const PortfolioIndividual = (props: PageProps) => {
	return (
		<Page
			title={props.portfolio.title ?? "Page"}
			className="mx-auto w-full max-w-5xl"
		>
			<TopGradientGlow />
			<div className="flex flex-col gap-2 mt-32 lg:mt-40">
				<div className="flex gap-5 items-center">
					<Link href="/#projects">
						<Button variant="ghost" size="icon">
							<FiArrowLeft size={18} />
						</Button>
					</Link>
					<div>
						<h2>
							{props.portfolio.title ??
								"Placeholder Project Name"}
						</h2>
						<p className="text-opacity-50">
							{dayjs(props.portfolio.publishedAt).format(
								"MMMM DD, YYYY"
							)}
						</p>
					</div>
				</div>

				<div className="mt-32 content w-full max-w-none">
					<PortableText
						value={props.portfolio.body}
						components={{
							types: {
								"Code Block": (props) => (
									<div className="flex flex-col p-3 rounded-xl border border-border bg-secondary/50 relative group">
										<div className="flex gap-1">
											<div className="w-3 h-3 bg-red-500 rounded-full" />
											<div className="w-3 h-3 bg-yellow-500 rounded-full" />
											<div className="w-3 h-3 bg-green-500 rounded-full" />
										</div>
										<hr className="mt-3 mb-0 opacity-40" />
										<code className="bg-transparent text-sm text-end">
											{props.value?.language}
										</code>
										<pre className="m-0 bg-transparent">
											{props.value?.code}
										</pre>
										<div className="absolute bottom-3 right-3 flex justify-end invisible group-hover:visible z-10">
											<Button
												variant="outline"
												size="icon"
												onClick={() => {
													navigator.clipboard.writeText(
														props.value?.code
													);
													toast.success(
														"Code copied to clipboard"
													);
												}}
											>
												<CopyIcon size={16} />
											</Button>
										</div>
									</div>
								),
							},
						}}
					/>
				</div>

				<div className="sticky mt-5 bottom-10 flex justify-end px-2 z-10">
					<Button onClick={() => window.scrollTo(0, 0)}>
						Scroll to top
					</Button>
				</div>
			</div>
		</Page>
	);
};

export default PortfolioIndividual;
