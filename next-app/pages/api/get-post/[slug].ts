import { NextApiRequest, NextApiResponse } from "next";

import $$sanity from "@/lib/sanity.client";
import { PostData } from "@/lib/types";
import { groq } from "next-sanity";

type InputQuery = {
	slug: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<PostData | { message: string }>
) {
	const { slug } = req.query as InputQuery;

	const fetchPortfolio = async () => {
		const q = groq`
			*[_type == "post" && slug.current == "${slug}"] {
                _id,
                publishedAt,
                categories,
                mainImage { alt, "url": asset -> url },
                title,
                "slug": slug.current,
                body
            }
		`;

		const data = await $$sanity.fetch(q);
		return data as Promise<PostData[]>;
	};

	const response = (await fetchPortfolio()) as PostData[];
	res.status(200).json(response[0]);
}
