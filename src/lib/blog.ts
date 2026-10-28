import { queryOptions } from "@tanstack/react-query";

export interface BlogImage {
	url: string;
	alt: string | null;
}

export interface BlogPost {
	_id: string;
	publishedAt: string;
	categories: string[] | null;
	mainImage: BlogImage | null;
	title: string;
	slug: string;
	body: unknown[] | null;
}

const projectId =
	import.meta.env.VITE_SANITY_PROJECT_ID ??
	(typeof process !== "undefined"
		? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
		: undefined) ??
	"2l4otb3p";
const dataset = "development";

async function sanityQuery<T>(query: string, params?: Record<string, string>) {
	const search = new URLSearchParams({
		query,
		perspective: "published",
	});
	if (params) {
		for (const [key, value] of Object.entries(params)) {
			search.set(`$${key}`, JSON.stringify(value));
		}
	}

	const res = await fetch(
		`https://${projectId}.api.sanity.io/v2026-01-08/data/query/${dataset}?${search}`,
	);
	if (!res.ok) {
		throw new Error("Failed to fetch posts");
	}
	const json = (await res.json()) as { result: T };
	return json.result;
}

const postProjection = `
	_id,
	publishedAt,
	categories,
	mainImage { alt, "url": asset->url },
	title,
	"slug": slug.current
`;

async function fetchPosts() {
	const result = await sanityQuery<BlogPost[]>(
		`*[_type == "post"]{${postProjection}} | order(publishedAt desc)`,
	);
	return result ?? [];
}

async function fetchPost(slug: string) {
	return sanityQuery<BlogPost | null>(
		`*[_type == "post" && slug.current == $slug][0]{
			${postProjection},
			body[]{
				...,
				_type == "image" => { alt, "url": asset->url }
			}
		}`,
		{ slug },
	);
}

export const postsQueryOptions = queryOptions({
	queryKey: ["blogs.all"],
	queryFn: fetchPosts,
	staleTime: 1000 * 60 * 60,
	gcTime: 1000 * 60 * 60,
	retry: 2,
	refetchOnWindowFocus: false,
});

export function postQueryOptions(slug: string) {
	return queryOptions({
		queryKey: ["blogs", slug],
		queryFn: () => fetchPost(slug),
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60,
		retry: 2,
		refetchOnWindowFocus: false,
	});
}

export function titleCase(value: string) {
	return value
		.split(/[\s-_]+/)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
		.join(" ");
}

export function formatPostDate(iso: string) {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
	}).format(new Date(iso));
}

export function isRecentPost(iso: string) {
	return Date.now() - new Date(iso).getTime() < 14 * 24 * 60 * 60 * 1000;
}
