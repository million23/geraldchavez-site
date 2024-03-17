import { NextStudio } from "next-sanity/studio";
import { metadata } from "next-sanity/studio/metadata";
import Head from "next/head";
import config from "../../../sanity.config";

export default function StudioPage() {
	return (
		<>
			<Head>
				{Object.entries(metadata).map(([key, value]) => (
					<meta key={key} name={key} content={value} />
				))}
			</Head>
			<main className="fixed top-0 left-0 w-full h-screen z-[99]">
				<NextStudio config={config} />
			</main>
		</>
	);
}
