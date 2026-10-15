import { NextApiRequest, NextApiResponse } from "next";

import $$hygraph from "@/lib/graph-client";
import { Portfolio } from "@/lib/types";
import { gql } from "graphql-request";

type InputQuery = {
	slug: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Portfolio | { message: string }>,
	// res: NextApiResponse,
) {
	const query: InputQuery = JSON.parse(req.body);

	if (!query.slug) {
		res.status(404).json({ message: "Not Found" });
	}

	const fetchPortfolio = async () => {
		const q = gql`
			{
				portfolio (where: {slug: "${query.slug}"}) {
					id
					cardImage {
						url
						fileName
					},
					productName
					projectDescription
					updatedAt
				}
			}
		`;

		const data = await $$hygraph.request(q);
		return data as Promise<Portfolio>;
	};

	const response = (await fetchPortfolio()) as Portfolio;
	res.status(200).json(response);
}
