import { queryOptions } from "@tanstack/react-query";
import { sanityQuery } from "#/lib/sanity";

export interface PortfolioImage {
	url: string;
	alt: string | null;
}

export interface PortfolioCard {
	_id: string;
	title: string;
	slug: string;
	mainImage: PortfolioImage | null;
}

export interface PortfolioProject extends PortfolioCard {
	publishedAt: string | null;
	body: unknown[] | null;
}

const cardProjection = `
	_id,
	title,
	"slug": slug.current,
	mainImage { alt, "url": asset->url }
`;

async function fetchPortfolios() {
	const result = await sanityQuery<PortfolioCard[]>(
		`*[_type == "portfolio"]{${cardProjection}} | order(publishedAt desc)`,
	);
	return result ?? [];
}

async function fetchPortfolio(slug: string) {
	return sanityQuery<PortfolioProject | null>(
		`*[_type == "portfolio" && slug.current == $slug][0]{
			${cardProjection},
			publishedAt,
			body[]{
				...,
				_type == "image" => { alt, "url": asset->url }
			}
		}`,
		{ slug },
	);
}

export const portfoliosQueryOptions = queryOptions({
	queryKey: ["portfolio.all"],
	queryFn: fetchPortfolios,
	staleTime: 1000 * 60 * 60,
	gcTime: 1000 * 60 * 60,
	retry: 2,
	refetchOnWindowFocus: false,
});

export function portfolioQueryOptions(slug: string) {
	return queryOptions({
		queryKey: ["portfolio", slug],
		queryFn: () => fetchPortfolio(slug),
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60,
		retry: 2,
		refetchOnWindowFocus: false,
	});
}
