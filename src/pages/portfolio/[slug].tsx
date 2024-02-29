import Page from "@/components/page-content";
import { Button } from "@/components/ui/button";
import $$hygraph from "@/lib/graph-client";
import { Portfolio } from "@/lib/types";
import dayjs from "dayjs";
import { gql } from "graphql-request";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Markdown from "react-markdown";

type PageProps = {
	portfolio: Portfolio;
};

export const getServerSideProps = async ({
	params,
}: {
	params: { slug: string };
}) => {
	const { slug } = params;

	const q = gql`
		{
			portfolio (where: {slug: "${slug}"}) {
				id
				slug
				productName
				publishedAt
				pageContent
			}
		}
	`;

	const portfolio = (await $$hygraph.request(q)) as Portfolio;

	if (!portfolio) {
		return {
			notFound: true,
		};
	}

	return {
		props: portfolio,
	};
};

const PortfolioIndividual = (props: PageProps) => {
	return (
		<Page
			title={props.portfolio.productName ?? "Page"}
			className="w-full max-w-5xl mx-auto py-32"
		>
			{props.portfolio && (
				<div className="flex flex-col gap-2 mt-10">
					<div className="flex gap-5 items-center">
						<Link href="/">
							<Button variant="ghost" size="icon">
								<FiArrowLeft size={18} />
							</Button>
						</Link>
						<div>
							<h2>
								{props.portfolio.productName ??
									"Placeholder Project Name"}
							</h2>
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
