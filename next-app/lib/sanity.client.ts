import { createClient, type ClientConfig } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const config: ClientConfig = {
	projectId,
	dataset,
	apiVersion: "2024-03-16",
	useCdn: false,
};

const $$sanity = createClient(config);

export default $$sanity;
