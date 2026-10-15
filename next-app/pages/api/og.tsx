import { ImageResponse } from "@vercel/og";

export const config = {
	runtime: "edge",
};

export default async function handler() {
	return new ImageResponse(
		<img
			src="https://media.graphassets.com/qhkfugBFStOH4FbLrGHv"
			alt="OGImage"
		/>,
		{
			width: 1200,
			height: 630,
		},
	);
}
