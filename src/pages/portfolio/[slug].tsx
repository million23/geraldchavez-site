import Page from "@/components/page-content";
import { Button } from "@/components/ui/button";
import $$hygraph from "@/lib/graph-client";
import { Portfolio } from "@/lib/types";
import dayjs from "dayjs";
import { gql } from "graphql-request";
import { GetStaticPaths } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Markdown from "react-markdown";

type PageProps = {
	portfolio: Portfolio;
};

type QueryReturnData = {
	portfolios: {
		slug: string;
	}[];
};

export const getStaticPaths = (async () => {
	const query = gql`
		{
			portfolios {
				slug
			}
		}
	`;

	const data = (await $$hygraph.request(query)) as QueryReturnData;
	const paths = data.portfolios.map((portfolio) => ({
		params: { slug: portfolio.slug },
	}));

	return {
		paths,
		fallback: true,
	};
}) satisfies GetStaticPaths;

export const getStaticProps = async (context: { params: { slug: string } }) => {
	const query = gql`
		query Portfolio {
			portfolio(where: { slug: "${context.params.slug}" }) {
				productName
				slug
				publishedAt
				updatedAt
				pageContent
			}
		}
	`;

	const data = (await $$hygraph.request(query)) as { portfolio: Portfolio };

	return {
		props: {
			portfolio: data.portfolio,
		},
		revalidate: 60 * 60 * 24, // 24 hours
	};
};

const PortfolioIndividual = (props: PageProps) => {
	return (
		<Page
			title={
				props.portfolio ? props.portfolio.productName : "Portfolio Page"
			}
		>
			{props.portfolio && (
				<div className="flex flex-col gap-2 mt-10">
					<div className="flex gap-5 items-center">
						<Link href="/portfolio">
							<Button variant="ghost" size="icon">
								<FiArrowLeft size={18} />
							</Button>
						</Link>
						<div>
							<h2>{props.portfolio.productName ?? "aklsjd"}</h2>
							<p className="text-opacity-50">
								{dayjs(props.portfolio.publishedAt).format(
									"MMMM DD, YYYY"
								)}
							</p>
						</div>
					</div>

					<div className="mt-16 markdown-content w-full max-w-none">
						<Markdown>{props.portfolio.pageContent}</Markdown>
					</div>

					<div className="sticky mt-5 bottom-10 flex justify-end px-2 z-10">
						<Button onClick={() => window.scrollTo(0, 0)}>
							Scroll to top
						</Button>
					</div>
				</div>
			)}
		</Page>
	);
};

export default PortfolioIndividual;
