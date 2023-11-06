import type { NextApiRequest, NextApiResponse } from "next";

import $$hygraph from "@/lib/graph-client";
import { IPortfolioData } from "@/lib/types";
import { gql } from "graphql-request";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IPortfolioData["data"]>,
	// res: NextApiResponse,
) {
	const fetchPortfolios = async () => {
		const query = gql`
			{
				portfolios (orderBy: publishedAt_ASC) {
					id
					slug
					cardImage {
						url
						fileName
					}
					productName
					updatedAt
					projectDescription
				}
			}
		`;

		const data = $$hygraph.request(query);
		return data as Promise<IPortfolioData["data"]>;
	};

	const response = await fetchPortfolios();

	res.status(200).json(response);
}
