import Page from "@/components/page-content";
import { Skeleton } from "@/components/ui/skeleton";
import { Portfolio } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Components } from "react-markdown";

const PortfolioPage = () => {
	const fetchPortfolio = async () => {
		const res = await fetch("/api/portfolios");
		const data = await res.json();

		return data as { portfolios: Portfolio[] };
	};

	const _portfolio = useQuery({
		queryKey: ["portfolio.all"],
		queryFn: fetchPortfolio,
		staleTime: 1000 * 60 * 60, // 1 hour
	});

	const markdownComponents: Partial<Components> = {
		p: ({ children, node, className }) => {
			return <p className={`${className} text-base`}>{children}</p>;
		},
		a: ({ children, node, className, href }) => {
			return (
				<Link
					className={`${className} text-base underline text-primary`}
					href={href as string}
					target="_blank"
					rel="noopener noreferrer"
				>
					{children}
				</Link>
			);
		},
		b: ({ children, node, className }) => {
			return (
				<span className={`${className} font-semibold`}>{children}</span>
			);
		},
	};

	return (
		<Page title="Portfolio">
			<h2>Portfolio</h2>
			<p className="max-w-md">
				Here's what i have done so far.
				<br /> Feel free to check them out or give some feedback.
			</p>

			<div className="grid grid-cols-1 gap-4 mt-16">
				{_portfolio.isLoading &&
					Array(3)
						.fill(0)
						.map((_, i) => (
							<Skeleton
								key={`portfoliocard_loader_${i}`}
								className="h-40"
							/>
						))}

				{_portfolio.isFetched &&
					_portfolio.data?.portfolios.map((portfolio) => (
						<Link
							href={`/portfolio/${portfolio.slug}`}
							className="flex flex-col md:flex-row border-2 md:items-center gap-7 hover:bg-secondary transition-colors rounded-xl p-3 outline-1 group"
						>
							<div className="min-w-[300px] min-h-[200px] relative">
								<Image
									src={portfolio.mainImage.url}
									alt={portfolio.mainImage.alt}
									fill
									className="rounded-lg object-center object-cover"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<h4 className="group-hover:text-primary transition-all">
									{portfolio.title}
								</h4>
							</div>
						</Link>
					))}
			</div>
		</Page>
	);
};

export default PortfolioPage;
