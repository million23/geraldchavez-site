const projectId =
	import.meta.env.VITE_SANITY_PROJECT_ID ??
	(typeof process !== "undefined"
		? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
		: undefined) ??
	"2l4otb3p";
const dataset = "development";

export async function sanityQuery<T>(
	query: string,
	params?: Record<string, string>,
) {
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
		throw new Error("Failed to fetch");
	}
	const json = (await res.json()) as { result: T };
	return json.result;
}
