import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemaTypes/blockContent";
import portfolio from "./schemaTypes/portfolio";
import post from "./schemaTypes/post";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [post, blockContent, portfolio],
};
