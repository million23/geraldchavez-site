import type { NextApiRequest, NextApiResponse } from "next";

import $$sanity from "@/lib/sanity.client";
import { Portfolio } from "@/lib/types";
import { groq } from "next-sanity";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Portfolio[]>
	// res: NextApiResponse,
) {
	const fetchPortfolios = async () => {
		const query = groq`
			*[_type == "portfolio"] {
				_id,
				body,
				title,
				publishedAt,
				"slug": slug.current,
				mainImage { alt, "url": asset -> url },
			}
		`;

		const data = (await $$sanity.fetch(query)) as Portfolio[];
		return data;
	};

	const response = await fetchPortfolios();

	res.status(200).json(response);
}
